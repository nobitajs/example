import { Injectable, Inject } from '@nestjs/common';
import { MongoService } from '../../common/providers/mongodb/mongodb.service';

@Injectable()
export class IndexService {

	constructor(
		@Inject('TEST') private readonly test: MongoService
	) {

	}

	async getName(){
		return { 
			code: 200,
			msg: 'NestJs' + Date.now(),
			data: await this.test.find({name: 'jj', age: 30})
		}
	}
}
