import { Controller, Get, Inject, UsePipes } from '@nestjs/common';
import { IndexService } from './index.service';
import { KafkaService } from '../../common/providers/kafka/kafka.service';
import { IndexJoiValidationPipe } from './index.pipe';


@Controller('/')
export class IndexController {
	constructor(
		private readonly indexService: IndexService,
		private readonly kafka: KafkaService,
	) { }

	@Get()
	@UsePipes(new IndexJoiValidationPipe())
	async index() {
		return this.indexService.getName();
	}
}