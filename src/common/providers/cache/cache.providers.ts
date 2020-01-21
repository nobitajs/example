import * as cacheManager from 'cache-manager';

export const CacheConnectionProviders = {
	provide: 'CACHE_CONNECTION',
	useFactory: (): any => {
		return cacheManager.caching({ store: 'memory', max: 100, ttl: 10 });
	},
};
