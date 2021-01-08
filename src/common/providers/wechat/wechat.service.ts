import { Injectable, Inject, HttpService } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Injectable()
export class WechatService {

	constructor(
		private readonly http: HttpService,
		@Inject(ConfigService) private readonly config: ConfigService,
	) {
		
	}


	send(data: object | string) {
		return this.http.request({
			url: this.config.get('wechatUrl'),
			method: 'POST',
			data
		}).toPromise().then(res => {
			console.log(res.data)
		});
	}

}
