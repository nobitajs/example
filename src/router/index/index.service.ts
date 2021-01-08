import * as puppeteer from 'puppeteer';
import { Injectable, Inject } from '@nestjs/common';
import * as moment from 'moment';
import { CacheService } from '../../common/providers/cache/cache.service';
import { WechatService } from '../../common/providers/wechat/wechat.service';
import { IndexAddUserDataDto } from './index.dto';
@Injectable()
export class IndexService {

	constructor(
		private readonly wechatService: WechatService,
		private readonly cacheService: CacheService,
	) {

	}

	async checkWorkAttendance(user: string, pwd: string){
		const url = 'https://gzehr.zuzuche.cn/Attendance/StaffDaily/Edit?ParameterID=W03030200&ParameterTitle=%E8%80%83%E5%8B%A4%E6%9F%A5%E8%AF%A2';
		const browser = await puppeteer.launch({headless: false});
		const page = await browser.newPage();
		await page.setExtraHTTPHeaders({
            'authorization': 'Basic ' + Buffer.from(`zuzuche.com:tantu.com`).toString('base64'),
		})
		
		await page.goto(url);
		await page.type('#UserName', user);
      	await page.type('#Password', pwd);
		await page.click('#dengluBtn');
		
		return Promise.race([
			new Promise((reslove) => {
				page.waitForSelector('.field-validation-error').then(async (e) => {
					await this.removeUser(user);
					reslove(1);
				})
			}),
			new Promise((reslove) => {
				page.on('response', async (e) => {
					if(e.url().indexOf('gzehr.zuzuche.cn/Attendance/StaffDaily/GetStaffDailyList') !== -1){
						const res = await e.json();
						let text = res.Data.BackValues.slice(-3).map((item) => {
							if(item.TranslateStatus){
								return `#${item.DateFormat} ${item.TranslateStatus} 上班打卡时间:${this.normalizeDate(item.DetailsResult[0].Range.Start.DateTime)} 下班打卡时间:${this.normalizeDate(item.DetailsResult[0].Range.End.DateTime)}`;
							}
						}).filter(e => e);
						if(text.length > 0){
							console.log(user, text.join('\n'))
							// this.wechatService.send({
							// 	users: user,
							// 	title: '考勤异常通知',
							// 	content: text.join('\n'),
							// 	url
							// });
						}
						reslove(2);
					}
				})
			})
		]).then(async (e) =>{
			browser.close();
		})
	}


	normalizeDate(dateStr: string) {
		if(!dateStr) return "--";
		const dateIntValue = parseInt(dateStr.replace("/Date(", "").replace(")/", ""), 10);
		let localOffset = new Date(dateIntValue).getTimezoneOffset();
		//getTimezoneOffset()返回分钟格式的时区偏移
		localOffset = localOffset * 60000;//转换为毫秒
		const utc = dateIntValue + localOffset;
		const beijing = utc + 28800000;
		return moment(beijing).format('HH:mm:ss');
	}

	async addUser(data: IndexAddUserDataDto){
		const users = await this.cacheService.get('users') || {};
		Object.assign(users, {
			[data.user]: {
				pwd: data.pwd
			}
		})
		return await this.cacheService.set('users', users);
	}

	async removeUser(id: string){
		const users = await this.cacheService.get('users') || {};
		delete users[id];
		return await this.cacheService.set('users', users);
	}
}
