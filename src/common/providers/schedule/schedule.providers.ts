import * as schedule from 'node-schedule';

export const ScheduleConnectionProviders = {
	provide: 'SCHEDULE_CONNECTION',
	useFactory: (): any => {
		return {};
	},
};
