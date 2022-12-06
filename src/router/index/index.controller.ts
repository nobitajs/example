import { Controller, Get, Inject, UsePipes } from '@nestjs/common';
import { IndexService } from './index.service';
import { IndexJoiValidationPipe } from './index.pipe';
import dayjs from 'dayjs';

@Controller('/')
export class IndexController {
	constructor(
		private readonly indexService: IndexService,
	) { }

	@Get()
	@UsePipes(new IndexJoiValidationPipe())
	async index() {
		// console.log(dayjs().sdxs)
		var a :any = {}

		a.b.x.e
		return this.indexService.getName();
	}
}