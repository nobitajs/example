import { Controller, Get, Inject } from '@nestjs/common';
import { MongoService } from '../../common/providers/mongodb/mongodb.service';

@Controller('/')
export class IndexController {
	constructor(
	) { }

	@Get()
	async index() {
		return 'hello nestjs';
	}

}