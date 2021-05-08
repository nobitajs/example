import { Controller, Get, Inject, Headers, Query, HttpService } from '@nestjs/common';
import * as qs from 'qs';
import * as download from '../../../download';
import { HelperService } from '../../common/providers/helper/helper.service';
// import { IndexService } from './index.service';
@Controller('/')
export class IndexController {
	constructor(
		@Inject('REDIS_CONNECTION') private readonly redis: any,
		private readonly http: HttpService,
		private readonly helper: HelperService,
		
	) { }

	@Get('/')
	async index(@Query() params, @Headers() headers) {
		headers.host ='api16-core-c-alisg.tiktokv.com';
		
		const p = qs.stringify(params);
		const url = `https://api16-core-c-alisg.tiktokv.com/aweme/v1/aweme/post/?${p}&`;
		const res = await this.http.get(url, {
			headers
		}).toPromise();
		const aweme_list = res.data.aweme_list;
			
		const done = await this.redis.hget('tiktok_download_cache', p);
		if(aweme_list && aweme_list.length > 0 && done !== '1'){
			await this.redis.hset('tiktok_download_cache', p, 1)
			aweme_list.forEach(items => {
				this.redis.rpush('download_list', JSON.stringify({
					url: items.video.play_addr.url_list[0],
					// path: `../${aweme_list[0].author.unique_id}/`,
					fileName: items.video.play_addr.file_hash,
					author: aweme_list[0].author.unique_id
					// extract: 'mp4'
				}))
			})
		}

		return res.data
	}

	@Get('/download')
	async download() {
		const max = 20;
		let i = 0;
		const arr = [];

		while(i < max){
			const str = await this.redis.lpop('download_list');
			if(str){
				const data = JSON.parse(str);
				arr.push({
					url: data.url,
					path: `../${data.author}/`,
					fileName: data.fileName,
					extract: 'mp4'
				})
			}
			i++;
		}
		// console.log(arr)
		if(arr.length > 0){
			download(arr, {title: `tiktok`, parallel: 5}).then(() => {
				console.log('下载完成');
				this.helper.sleep(1000);
				this.http.get(`http://127.0.0.1:6001/download`).toPromise().then()
			})
		}else{
			this.helper.sleep(10000);
			this.http.get(`http://127.0.0.1:6001/download`).toPromise().then()
		}

		return '开始下载' + new Date().getTime();

	}

}
