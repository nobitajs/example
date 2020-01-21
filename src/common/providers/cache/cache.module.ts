import { Module } from '@nestjs/common';
import { CacheConnectionProviders } from './cache.providers';
import { CacheService } from './cache.service';


@Module({
	providers: [CacheConnectionProviders, CacheService],
	exports: [CacheConnectionProviders, CacheService]
})
export class CacheModule {
}
