import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class GetListService {

	constructor(
	) {

	}

	getName(){
		return { 
			code: 200,
			msg: 'NestJs'
		}
	}
}
