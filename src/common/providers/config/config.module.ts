import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { AppConfigProviders } from './appConfig.providers'

@Module({
  providers: [ConfigService, AppConfigProviders],
  exports: [ConfigService, AppConfigProviders]
})
export class ConfigModule { };
