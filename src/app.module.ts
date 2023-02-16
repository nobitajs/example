import { Module, Global, NestModule, MiddlewareConsumer, Inject } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from './common/providers/config/config.module';
// import { KafkaModule } from './common/providers/kafka/kafka.module';
import { LoggerModule } from './common/providers/logger/logger.module';
import { CacheModule } from './common/providers/cache/cache.module';
import { HelperModule } from './common/providers/helper/helper.module';
import { MongodbModule } from './common/providers/mongodb/mongodb.module';
// import { RedisModule } from './common/providers/redis/redis.module';
import { ConfigService } from './common/providers/config/config.service';
import { ScheduleService } from './common/providers/schedule/schedule.service';
import { ScheduleModule } from './common/providers/schedule/schedule.module';
import { CorsMiddleware } from './common/middleware/cors.middleware';
import { RouterModule } from './router/router.modules';
import { AllExceptionsFilter } from './common/exception/all.exception';

@Global()
@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    }],
  imports: [ConfigModule, LoggerModule, CacheModule, MongodbModule, ScheduleModule, HelperModule, RouterModule],
  exports: [ConfigModule, LoggerModule, CacheModule, MongodbModule, ScheduleModule, HelperModule]
})
export class AppModule implements NestModule {
  constructor(
    private readonly config: ConfigService,
    // private readonly schedule: ScheduleService,
  ) { }
  configure(consumer: MiddlewareConsumer) {
    if (this.config.get('env') === 'local') {
      consumer
        .apply(CorsMiddleware)
        .forRoutes('*');
    }
  }

  // onModuleInit(){
  //   console.log('=========onModuleInit==========')
  // }

  // onApplicationBootstrap(){
  //   const id = this.schedule.set('*/2 * * * * *', () => {console.log('========')})
  // }
}
