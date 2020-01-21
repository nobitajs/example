import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import appConfig from './appConfig.providers'

@Module({
  //   imports: [ApplicationModule, GlobalModule],
  providers: [ConfigService, ...appConfig],
  exports: [ConfigService, ...appConfig]
})
export class ConfigModule { };
