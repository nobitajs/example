import * as moment from 'moment';
import * as puppeteer from 'puppeteer';
import { Controller, Get, Inject } from '@nestjs/common';
import { WechatService } from '../../common/providers/wechat/wechat.service';

function getDateIntValue(dateStr) {
	const value = parseInt(dateStr.replace("/Date(", "").replace(")/", ""), 10);
	return value;
}

function normalizeDate(localTime) {
	var dateIntValue = getDateIntValue(localTime);
	var localOffset = new Date(dateIntValue).getTimezoneOffset();
	//getTimezoneOffset()返回分钟格式的时区偏移
	localOffset = localOffset * 60000;//转换为毫秒
	var utc = dateIntValue + localOffset;
	var beijing = utc + 28800000;
	return moment(beijing).format('HH:mm:ss');
}

@Controller('/')
export class IndexController {
	constructor(
		private readonly wechatService: WechatService,
		
	) { }

	@Get()
	async index() {
		// console.log(puppeteer)
		const browser = await puppeteer.launch({headless: false});
		const page = await browser.newPage();
		await page.setExtraHTTPHeaders({
            'authorization': 'Basic ' + Buffer.from(`zuzuche.com:tantu.com`).toString('base64'),
		})
		
		await page.goto('https://gzehr.zuzuche.cn/Attendance/StaffDaily/Edit?ParameterID=W03030200&ParameterTitle=%E8%80%83%E5%8B%A4%E6%9F%A5%E8%AF%A2');
		await page.type('#UserName', 'zzc2018124');
      	await page.type('#Password', 'As0415..');
		await page.click('#dengluBtn');

		page.on('response', async (e) => {
			if(e.url().indexOf('gzehr.zuzuche.cn/Attendance/StaffDaily/GetStaffDailyList') !== -1){
				const res = await e.json();
				let text = [];
				res.Data.BackValues.forEach((item) => {
					if(item.TranslateStatus){
						text.push(`#${item.DateFormat} ${item.TranslateStatus} 上班打卡时间:${normalizeDate(item.DetailsResult[0].Range.Start.DateTime)} 下班打卡时间:${normalizeDate(item.DetailsResult[0].Range.End.DateTime)}`);
					}

					this.wechatService.send({
						users: 'zzc2018124',
						title: '考勤异常通知',
						content: text.join('\n'),
						url: 'https://gzehr.zuzuche.cn/Attendance/StaffDaily/Edit?ParameterID=W03030200&ParameterTitle=%E8%80%83%E5%8B%A4%E6%9F%A5%E8%AF%A2'
					});
				})
			}
	
		})
	
		return '查询成功';
	}
}
