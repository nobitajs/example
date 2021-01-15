import axios from 'axios';
import * as qs from 'qs';
import * as crypto from 'crypto';
import { Injectable, Inject, HttpService } from '@nestjs/common';
import { CacheService } from '../../common/providers/cache/cache.service';
import { HelperService } from '../../common/providers/helper/helper.service';

import { IndexDataDto, IndexGetSizeIdDataDto } from './index.dto';

let time = 200;
@Injectable()
export class IndexService {

	constructor(
		private readonly cacheService: CacheService,
		private readonly http: HttpService,
		private readonly helper: HelperService,
		
	) {

	}
	async buy(data: IndexDataDto){
		let i = 0;
		let n = 0;
		
		while(true){
			axios({
				url: 'https://www.huahaicang.cn/api/neptune/neptune/cart/add/v2',
				method: 'post',
				data: qs.stringify({
					sizeNum: '1',
					source: 'huahaicang_iphone',
					sizeId: data.sizeId[i],
					method: 'POST',
					timestamp: (+new Date() / 1000).toFixed(),
					// marsCid: '1609900371316_2016e3181ff0ca1a428ed470f9ca72d9',
					// appVersion: '6.7.8',
					// version: '6.7.8',
					// 'hhc-param': 'bda37924cee6014e70dfb46a79905931a63692cf',
					// deviveryAreaId: '944101103999',
					// deliveryAreaId: '944101103999',
					// nonce: crypto.createHash('md5').update(Math.random().toString()).digest("hex"),
					// sign: crypto.createHash('md5').update(Math.random().toString()).digest("hex")
				}),
				headers: {
					'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
					'Content-Type': 'application/x-www-form-urlencoded',
					referer: 'https://www.huahaicang.cn/',
					cookie: data.cookie,
				}
			}).then(res => {
				console.log(res.data.msg, res.data.code)
			})
			i++; n++;
			if(n >= 16){
				await this.helper.sleep(2300)
				n = 0;
			}else{
				await this.helper.sleep(180)
			}
			
			if(i == data.sizeId.length){
				i = 0;
			}
		}
		return ''
	}

	getSizeId(data: IndexGetSizeIdDataDto){
		return axios({
			url: 'https://www.huahaicang.cn/api/neptune/goods/detail_with_logo',
			method: 'post',
			data: qs.stringify({
				gid: data.gid,
				clientType: 'wap',
				method: 'GET',
			}),
			headers: {
				'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
				'Content-Type': 'application/x-www-form-urlencoded',
				referer: 'https://www.huahaicang.cn/',
			}
		}).then(res => {
			return res.data.data.goodsStock.sizes.map((item) => {
				return `${item.name} : ${item.sizeId}`
			})
		})
	}
}
