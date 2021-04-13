import { Controller, Get, Post, Headers, Query } from '@nestjs/common';
import { MongoService } from '../../common/providers/mongodb/mongodb.service';
import { IndexService } from './index.service';
import { KafkaService } from '../../common/providers/kafka/kafka.service';


@Controller('/getList')
export class IndexController {
	constructor(
		private readonly indexService: IndexService,
		private readonly kafka: KafkaService,
		
	) { }

	@Get()
	async index(@Query() params) {
		return this.indexService.getCarList(params);
	}

}