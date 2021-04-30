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

	@Get()
	async buy(@Body() data: IndexDataDto) {
		return this.indexService.buy(data);
	}

	@Get('/getSizeId')
	async getSizeId(@Query() data: IndexGetSizeIdDataDto){
		console.log(data)
		return await this.indexService.getSizeId(data);
	}
}
