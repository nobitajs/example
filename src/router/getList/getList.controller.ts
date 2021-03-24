import * as puppeteer from 'puppeteer'
import axios from 'axios';
import { Controller, Get, Inject } from '@nestjs/common';
import { GetListService } from './getList.service';
import { MongoService } from '../../common/providers/mongodb/mongodb.service';
import { KafkaService } from '../../common/providers/kafka/kafka.service';


@Controller('/getList')
export class GetListController {
	constructor(
		private readonly getListService: GetListService,
		private readonly kafka: KafkaService,
		@Inject('CTRIP_ZUCHE_AREA_TBL') private readonly ctrip_zuche_area_tbl: MongoService
	) { }

	@Get()
	async getList() {
		// console.log(await this.ctrip_zuche_area_tbl.find({atype: '百子湾'}))
		// const browser = await puppeteer.launch({
		// 	headless: false, 
		// 	defaultViewport: {
		// 		devtools: true,
		// 		isMobile: true, 
		// 		width: 375, 
		// 		height: 812
		// 	}
		// })
		// let first = true;
		// // 先打开首页注入cookie
		// const page1 = await browser.newPage();
		// await page1.goto('https://m.ctrip.com/html5/carhire');

		// // 再打开列表页
		// const page2 = await browser.newPage();
		// page2.goto('https://m.ctrip.com/webapp/cw/rn_car_app/Market.html?CRNType=1&fromurl=common&landingto=List&apptype=ISD_C_CW&filters=false&st=ser&CRNModuleName=rn_car_app&pcid=43&plat=18.303421053756&plng=109.41463173357&ptime=20210316100000&rtime=20210419100000&rcid=43&rlat=18.303421053756&rlng=109.41463173357&ouid=');
		// page2.setRequestInterception(true);

		// page2.on('request', async request => {
		// 	const url = request.url();
		// 	if(url.indexOf('https://m.ctrip.com/restapi/soa2/18631/queryProducts') !== -1){
				
		// 		request.abort();
		// 		if(first){
		// 			first = false;
		// 			const params = {
		// 				url: request.url(),
		// 				method: request.method(),
		// 				data: request.postData(),
		// 				headers: request.headers()
		// 			}
		// 			const res = await axios(params)
		// 			console.log(res.data, '====list====');
		// 		}
				
		// 	}else{
		// 		request.continue();
		// 	}
		// })

		return {};
	}
}