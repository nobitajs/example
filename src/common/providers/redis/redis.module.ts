import { Module } from '@nestjs/common';
import { RedisConnectionProviders } from './redis.providers';

@Module({
	providers: RedisConnectionProviders,
	exports: RedisConnectionProviders
})
export class RedisModule {
}
