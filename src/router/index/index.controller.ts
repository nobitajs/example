import { Controller, Get, Inject, UsePipes } from '@nestjs/common';
import { IndexService } from './index.service';
import { IndexJoiValidationPipe } from './index.pipe';


@Controller('/')
export class IndexController {
	constructor(
		private readonly indexService: IndexService,
	) { }

	@Get()
	@UsePipes(new IndexJoiValidationPipe())
	async index() {
		const a: any = {};
		a.bb.cc
		return this.indexService.getName();
	}
}