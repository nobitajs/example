import { Module } from '@nestjs/common';
import { MongodbConnectionProviders } from './mongodb.providers';

@Module({
	providers: MongodbConnectionProviders,
	exports: MongodbConnectionProviders
})
export class MongodbModule {
}
