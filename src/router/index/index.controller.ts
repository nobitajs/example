import { isEmpty } from 'lodash';
import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { IndexService } from './index.service';
import { CacheService } from '../../common/providers/cache/cache.service';
import { IndexDataDto, IndexGetSizeIdDataDto } from './index.dto';

@Controller('/')
export class IndexController {
	constructor(
		private readonly indexService: IndexService,
		private readonly cacheService: CacheService,
	) { }

	@Post()
	async buy(@Body() data: IndexDataDto) {
		return this.indexService.buy(data);
	}

	@Get('/getSizeId')
	async getSizeId(@Query() data: IndexGetSizeIdDataDto){
		return await this.indexService.getSizeId(data);
	}
}
