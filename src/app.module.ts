import { Module, Global, NestModule, MiddlewareConsumer, HttpModule, HttpService } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from './common/providers/config/config.module';
import { KafkaModule } from './common/providers/kafka/kafka.module';
import { CacheModule } from './common/providers/cache/cache.module';
import { HelperModule } from './common/providers/helper/helper.module';
import { MongodbModule } from './common/providers/mongodb/mongodb.module';
// import { RedisModule } from './common/providers/redis/redis.module';
import { ConfigService } from './common/providers/config/config.service';
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
  imports: [ConfigModule, KafkaModule, CacheModule, MongodbModule, ScheduleModule, HttpModule, HelperModule, RouterModule],
  exports: [ConfigModule, KafkaModule, CacheModule, MongodbModule, ScheduleModule, HttpModule, HelperModule]
})
export class AppModule implements NestModule {
  constructor(
    private readonly config: ConfigService,
  ) { }
  configure(consumer: MiddlewareConsumer) {
    if (this.config.get('env') === 'local') {
      consumer
        .apply(CorsMiddleware)
        .forRoutes('*');
    }
  }
}
