import Redis from 'ioredis';
import { ConfigService } from '../config/config.service';
import { KafkaService } from '../kafka/kafka.service';

export const RedisConnectionProviders = [{
	provide: 'REDIS_CONNECTION',
	useFactory: async (config: ConfigService, kafka: KafkaService): Promise<Redis> => {
		const redisConf = config.get('redis');
		const redis: Redis = new Redis(redisConf);
		redis.on('connect', () => {
			console.log('system', 'redis链接成功');
		});
		return redis;
	},
	inject: [ConfigService, KafkaService]
}];
