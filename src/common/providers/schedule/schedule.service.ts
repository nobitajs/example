import { Injectable, Inject } from '@nestjs/common';
import * as schedule from 'node-schedule';

@Injectable()
export class ScheduleService {

	constructor(
	) {
		this.timer = [];
	}

	timer: Array<string>

	set(key: string, cron: string, callback: Function){
		if(!this.timer[key]){
			this.timer[key] = schedule.scheduleJob(cron, callback);
		}
	}

	clear(key: string){
		this.timer[key].cancel()
		this.timer[key] = null;
	}
}
