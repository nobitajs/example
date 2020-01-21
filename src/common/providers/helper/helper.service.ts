import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
	constructor() { }
	sleep(time: number = 1000): Promise<any> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({});
			}, time);
		});
	}
};
