import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class IndexService {

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
