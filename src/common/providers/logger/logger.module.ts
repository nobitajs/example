import { Module } from '@nestjs/common';
import { LoggerInitProviders } from './logger.providers';

@Module({
	providers: [LoggerInitProviders],
	exports: [LoggerInitProviders]
})
export class LoggerModule {
}
