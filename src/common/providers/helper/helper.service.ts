import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer'


const username = 'lum-customer-zuzuche-zone-zone_haiming';
const password = '585og2oafwpv';

@Injectable()
export class HelperService {
	constructor() { }
	sleep(time: number = 1000): Promise<any> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({});
			}, time);
		});
	}

	async puppeteer(options: any = {}): Promise<any>{
        const proxyUrlConfig = this.getUrl({
			sessionId: true
		});
		const args = [ '--no-sandbox', '--disable-dev-shm-usage', 'blink-settings=imagesEnabled=false', '--disable-blink-features=AutomationControlled' ];
		if(options.proxy){
			args.push(`--proxy-server=${proxyUrlConfig}`)
		}
		
		const browser = await puppeteer.launch({
			headless: false, 
			defaultViewport: {
				hasTouch: true,
				devtools: true,
				isMobile: true, 
				width: 375, 
				height: 812
			},
			args,
			...options
		})
		return browser;
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
};
