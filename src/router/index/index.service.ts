import axios from 'axios';
import * as qs from 'qs';
import * as crypto from 'crypto';
import { Injectable, Inject, HttpService } from '@nestjs/common';
import { CacheService } from '../../common/providers/cache/cache.service';
import { HelperService } from '../../common/providers/helper/helper.service';

import { IndexDataDto, IndexGetSizeIdDataDto } from './index.dto';

let time = 0;
let sizeId = ['6919302856292136449', '6919228632634267926', '6919257774089795998', '6919291198117017502', '6919228632634378497', '6919228632409647361']
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
		let max = 2;
		let n = 0;
		while(true){
			let p = [];
			while(p.length < max){
				if(i >= sizeId.length){
					i = 0;
				}
				p.push(axios({
					url: 'https://www.huahaicang.cn/api/neptune/neptune/cart/add/v2',
					method: 'post',
					data: qs.stringify({
						// sizeNum: 1,
						// source: 'huahaicang_iphone',
						// sizeId: '6919228632765389068',
						// clientType: 'wap',
						// marsCid: '1615348836173_9cda4f8892b516f109634071bd1692ba',
						// appVersion: '7.0.0',
						// version: '7.0.0',
						// deliveryAreaId: '944101103104',
						// method: 'POST',
						// 'hhc-param': '68c57730c3796faf18a9d277505bad67b934b3ad',
						// deviveryAreaId: '944101103104',
						// timestamp: '1620360344',
						// nonce: 'c36250d8e917d1794500b2c2b05c7498',
						// sign: 'dd5779a17750ab1a7c9782c5122d13e7',

						clientType: 'wap',
						sizeNum: '1',
						source: 'huahaicang_iphone',
						sizeId: sizeId[i],
						method: 'POST',
						timestamp: (+new Date() / 1000 - i).toFixed(),
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
						cookie: 'mars_cid=1615348836173_9cda4f8892b516f109634071bd1692ba; hhc-param=68c57730c3796faf18a9d277505bad67b934b3ad; WAP[p_wh]=VIP_NH; warehouse=VIP_NH; m_vip_province=104104101103; WAP[p_area]=%25E5%25B9%25BF%25E4%25B8%259C%25E7%259C%2581.%25E5%25B9%25BF%25E5%25B7%259E%25E5%25B8%2582.%25E8%258D%2594%25E6%25B9%25BE%25E5%258C%25BA; areaId=944101103104; _t_offset=0; _t_=1621563533; saturn=viurbkuhbbp6ruf94joebe2o4p0; triton=CCC8C0CE745C8596F8AEAE63C732638C6F2E249C',
					}
				}));
				i++;
			}
			n += max;
			if(n % 16 === 0){
				time = 2200;
			}else{
				time = 0
			}
			console.log(time)
			await new Promise((aa) =>{
				setTimeout(()=>{
					aa({});
				},time)
			})
			const res = await Promise.all(p)
			res.forEach(data=>{
				console.log(data.data.msg);
			})
			
		}
		return ''
	}

	getSizeId(data: IndexGetSizeIdDataDto){
		return axios({
			url: 'https://huahaicang-api.vip.com/hhc/wap/goods_detail/v1',
			method: 'get',
			params: {
				goodsId: data.gid,
				clientType: 'wap',
				method: 'GET',
				adId: data.adId,
				deliveryAreaId: '944101103104'
			},
			headers: {
				'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
				'Content-Type': 'application/x-www-form-urlencoded',
				referer: 'https://www.huahaicang.cn/',
			}
		}).then(res => {
			return res.data.data.goodsList.map(items => (
				items.sizes.map((item) => {
					return `${item.sizeName} : ${item.sizeId}`
				})
			))
		})
	}
}
