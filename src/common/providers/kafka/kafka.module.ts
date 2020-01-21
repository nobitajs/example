import { Module } from '@nestjs/common';
import { KafkaConnectionProviders } from './kafka.providers';
import { KafkaService } from './kafka.service';

@Module({
	providers: [KafkaConnectionProviders, KafkaService],
	exports: [KafkaConnectionProviders, KafkaService]
})
export class KafkaModule {
}
