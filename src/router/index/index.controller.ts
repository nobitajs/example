import { Controller, Get, Inject, Headers, Query, HttpService } from '@nestjs/common';
import * as qs from 'qs';
// import { MongoService } from '../../common/providers/mongodb/mongodb.service';
// import { IndexService } from './index.service';
import axios from 'axios';
@Controller('/')
export class IndexController {
	constructor(
		// @Inject('LIST') private readonly mongo: MongoService
		private readonly http: HttpService
	) { }

	@Get('/')
	async index(@Query() params, @Headers() headers) {
		headers.host ='api16-core-c-alisg.tiktokv.com';
		const p = qs.stringify(params);
		const res = await this.http.get(`https://api16-core-c-alisg.tiktokv.com/aweme/v1/aweme/post/?${p}&`, {
			headers
		}).toPromise();

		console.log(res, params, '================')
		return res.data
	}

}
