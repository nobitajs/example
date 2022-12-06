import { Injectable, Inject } from '@nestjs/common';
import schedule from 'node-schedule';

@Injectable()
export class ScheduleService {
	constructor(
	) {
		this.schedules = [];
	}

	schedules: Array<schedule.Joi>

	set(cron: String, fn: Function): Number{
		return this.schedules.push(schedule.scheduleJob(cron, fn)) - 1
	}

	cancel(id): boolean{
		return this.schedules[id].cancel()
	}
}
