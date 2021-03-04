import axios from 'axios';
import * as qs from 'qs';
import * as crypto from 'crypto';
import { Injectable, Inject, HttpService } from '@nestjs/common';
import { CacheService } from '../../common/providers/cache/cache.service';
import { HelperService } from '../../common/providers/helper/helper.service';

import { IndexDataDto, IndexGetSizeIdDataDto } from './index.dto';

let time = 0;
let sizeId = ['1667816005403977', '1667799596280896']
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
		let max = 1;
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
						cookie: 'hhc-param=bda37924cee6014e70dfb46a79905931a63692cf; mars_cid=1609900371316_2016e3181ff0ca1a428ed470f9ca72d9; areaId=944101103101; WAP[p_wh]=VIP_NH; warehouse=VIP_NH; m_vip_province=104104101103; WAP[p_area]=%25E5%25B9%25BF%25E4%25B8%259C%25E7%259C%2581.%25E5%25B9%25BF%25E5%25B7%259E%25E5%25B8%2582.%25E8%258D%2594%25E6%25B9%25BE%25E5%258C%25BA; _t_offset=0; saturn=v4gkccm692n8isst7l488nbr693; triton=CCC8C0CE745C8596F8AEAE63C732638C6F2E249C; _t_=1614309600',
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
