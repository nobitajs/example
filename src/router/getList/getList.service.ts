import * as puppeteer from 'puppeteer'
import axios from 'axios';
import { Injectable, Inject } from '@nestjs/common';
import { MongoService } from '../../common/providers/mongodb/mongodb.service';
import { GetCarListParamsDto, SendGetCarListToCtrip } from './getList.dto';


@Injectable()
export class GetListService {

	constructor(
		@Inject('CTRIP_ZUCHE_CITY_TBL') private readonly ctrip_zuche_city_tbl: MongoService
	) {

	}

	async getCityId(name: string): Promise<string|undefined>{
		const res =  await this.ctrip_zuche_city_tbl.findOne({name})
		return res?.id;
	}

	getCarListParams(data: GetCarListParamsDto): Promise<any>{
		const {pcid, rcid, plat, plng, rlat, rlng, ptime, rtime} = data;
		return new Promise(async (resolve, reject) => {
			const url = `https://m.ctrip.com/webapp/cw/rn_car_app/Market.html?fromurl=common&landingto=List&apptype=ISD_C_CW&filters=false&st=ser&CRNModuleName=rn_car_app&pcid=${pcid}&plat=${plat}&plng=${plng}&ptime=${ptime}&rtime=${rtime}&rcid=${rcid}&rlat=${rlat}&rlng=${rlng}&ouid=`;
			const browser = await puppeteer.launch({
				// headless: false, 
				defaultViewport: {
					devtools: true,
					isMobile: true, 
					width: 375, 
					height: 812
				}
			})
			let first = true;
			// 先打开首页注入cookie
			const page1 = await browser.newPage();
			await page1.goto('https://m.ctrip.com/html5/carhire');

			// 再打开列表页
			const page2 = await browser.newPage();
			page2.goto(url);
			page2.setRequestInterception(true);
		
			page2.on('request', async request => {
				const url = request.url();
				if(url.indexOf('https://m.ctrip.com/restapi/soa2/18631/queryProducts') !== -1){
					
					request.abort();
	
					if(first){
						first = false;
						const params = {
							url: request.url(),
							method: request.method(),
							data: request.postData(),
							headers: request.headers()
						}
						
						const res = await axios(params)
						page1.close();
						page2.close();
						resolve(res);
						
					}
					
				}else{
					request.continue();
				}
			})
		})
		
	}


	sendGetCarListToCtrip(params){
		return axios(params)
	}
}
