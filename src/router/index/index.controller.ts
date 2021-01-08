import { isEmpty } from 'lodash';
import { Controller, Post, Body } from '@nestjs/common';
import { IndexService } from './index.service';
import { CacheService } from '../../common/providers/cache/cache.service';
import { IndexDataDto } from './index.dto';

@Controller('/')
export class IndexController {
	constructor(
		private readonly indexService: IndexService,
		private readonly cacheService: CacheService,
	) { }

	@Post()
	async getSizeId(@Body() data: IndexDataDto) {
		return this.indexService.getSizeId(data);
	}

	@Post('/addUser')
	async set(){
	}
}
