import * as puppeteer from 'puppeteer'
import axios from 'axios';
import { Injectable, Inject } from '@nestjs/common';
import { MongoService } from '../../common/providers/mongodb/mongodb.service';
import { GetCarListParamsDto, SendGetCarListToCtrip } from './getList.dto';

const username = 'lum-customer-zuzuche-zone-zone_haiming';
const password = '585og2oafwpv';
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
			const url = `https://m.ctrip.com/webapp/cw/rn_car_app/Market.html?fromurl=common&landingto=List&apptype=ISD_C_CW&filters=false&st=ser&CRNModuleName=rn_car_app&pcid=${pcid}&ptime=${ptime}&rtime=${rtime}&rcid=${rcid}&&ouid=`;
			const browser = await puppeteer.launch({
				// headless: false, 
				defaultViewport: {
					devtools: true,
					isMobile: true, 
					width: 375, 
					height: 812
				},
				args: [ '--no-sandbox', '--disable-dev-shm-usage' ]
			})
			const proxyAuthConfig = {
				username: this.getUserName({
					sessionId: true
				}),
				password: this.getPassword(),
			};

			// 先打开首页注入cookie
			const page1 = await browser.newPage();
			await page1.authenticate(proxyAuthConfig);
			await page1.goto('https://m.ctrip.com/html5/carhire');
			
			// 再打开列表页
			const page2 = await browser.newPage();
			await page2.setRequestInterception(true);
			await page2.authenticate(proxyAuthConfig);
			await page2.setCacheEnabled(false);
			

			async function listener(request){
				const url = request.url();
				if(url.indexOf('https://m.ctrip.com/restapi/soa2/18631/queryProducts') !== -1){
					request.abort();
					page2.off('request', listener)

					const res = await axios({
						url: request.url(),
						method: 'post',
						data: JSON.parse(request.postData()),
						headers: request.headers()
					}).catch(e => {
						console.log(request.url(), '失败')
						return {}
					})

					browser.close();
					resolve(res);
					
				}else{
					request.continue();
				}
			}
			
			page2.on('request', listener)
			await page2.goto(url);
		})
		
	}

	sendGetCarListToCtrip(params){
		return axios({
			timeout: 0,
			...params
		})
	}


	getFullUrl(options = {}) {
		const username = this.getUserName(options);
		const password = this.getPassword();
		const url = this.getUrl();
		return `http://${username}:${password}@${url}`;
	  }
	
	  getUrl(options:any = {}) {
		const superProxy = options.superProxy ? 'servercountry-CN.' : '';
		const domain = 'zproxy.lum-superproxy.io';
		return `${superProxy}${domain}:22225`;
	  }
	
	  getUserName(options:any = {}) {
		const routeErr = [ 'pass_dyn', 'block' ].includes(options.routeErr) ? `-route_err-${options.country}` : '';
		const country = options.country ? `-country-${options.country}` : '';
		const dns = [ 'remote', 'local' ].includes(options.dns) ? `-dns-${options.dns}` : '';
		const sessionId = options.sessionId ? `-session-${(1000000 * Math.random())}` : '';
		return `${username}${routeErr}${country}${dns}${sessionId}`;
	  }
	
	  getPassword() {
		return password;
	  }
}
