import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class CacheService {

	constructor(
		@Inject('CACHE_CONNECTION') private readonly cache: any
	) { }

	public get(key: string): Promise<any> {
		return new Promise((resolve) => {
			this.cache.get(key, (err, result) => {
				if (err) {
					return resolve(null);
				}
				return resolve(result);
			});
		});
	}

	public set(key, data, opt = {}): Promise<boolean> {
		return new Promise((resolve) => {
			this.cache.set(key, data, opt, (err) => {
				if (err) {
					resolve(false);
				}
				resolve(true);
			});
		});

	}

	public del(key): Promise<boolean> {
		return new Promise((resolve) => {
			this.cache.del(key, (err) => {
				if (err) {
					resolve(false);
				}
				resolve(true);
			});

		});
	}

	public delAll(): Promise<boolean> {
		return new Promise((resolve) => {
			this.cache.reset((err) => {
				if (err) {
					resolve(false);
				}
				resolve(true);
			});
		});
	}

	public keys(): Promise<any> {
		return new Promise((resolve) => {
			this.cache.keys((err, reslut) => {
				if (err) {
					resolve(false);
				}
				resolve(reslut);
			});
		});
	}

}
