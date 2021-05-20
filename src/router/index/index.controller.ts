import { Controller, Get, Inject } from '@nestjs/common';
import { MongoService } from '../../common/providers/mongodb/mongodb.service';
import { IndexService } from './index.service';
import { KafkaService } from '../../common/providers/kafka/kafka.service';


@Controller('/')
export class IndexController {
	constructor(
		private readonly indexService: IndexService,
		private readonly kafka: KafkaService,
		
	) { }

	@Get()
	async index() {
		this.kafka.log('123')
		return this.indexService.getName();
	}
}