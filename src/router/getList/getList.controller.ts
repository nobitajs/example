import { Controller, Get, Inject } from '@nestjs/common';
import { MongoService } from '../../common/providers/mongodb/mongodb.service';
import { GetListService } from './getList.service';
import { KafkaService } from '../../common/providers/kafka/kafka.service';
import * as puppeteer from 'puppeteer'

@Controller('/getList')
export class GetListController {
	constructor(
		private readonly getListService: GetListService,
		private readonly kafka: KafkaService,
		
	) { }

	@Get()
	async getList() {
		const bucket = [];
		const browser = await puppeteer.launch({
			headless: false, 
			defaultViewport: {
				isMobile: true, 
				width: 375, 
				height: 812
			}
		})
		// 先打开首页注入cookie
		const page1 = await browser.newPage();
		await page1.goto('https://m.ctrip.com/html5/carhire');

		// 再打开列表页
		const page2 = await browser.newPage();
		await page2.goto('https://m.ctrip.com/webapp/cw/rn_car_app/Market.html?CRNType=1&fromurl=common&landingto=List&apptype=ISD_C_CW&filters=false&st=ser&CRNModuleName=rn_car_app&pcid=43&plat=18.303421053756&plng=109.41463173357&ptime=20210316100000&rtime=20210419100000&rcid=43&rlat=18.303421053756&rlng=109.41463173357&ouid=');
		// await page2._client.send('Network.enable', {
		// 	maxResourceBufferSize: 1024 * 1204 * 100,
		// 	maxTotalBufferSize: 1024 * 1204 * 1000,
		// })
		page2.on('response', async response => {
			const url = response.url();
			if(url.indexOf('https://m.ctrip.com/restapi/soa2/13191/getAccountInfoByTicket.json') !== -1){
					console.log(await response.text())
				
			}
		})
		return this.getListService.getName();
	}
}