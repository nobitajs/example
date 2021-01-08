import { Module } from '@nestjs/common';
import { ScheduleConnectionProviders } from './schedule.providers';
import { ScheduleService } from './schedule.service';

@Module({
	providers: [ScheduleService],
	exports: [ScheduleService]
})
export class ScheduleModule {
}
