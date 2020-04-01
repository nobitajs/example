import { HttpService } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { KafkaService } from '../kafka/kafka.service';
import { AppConfigInterface } from './interfaces/appConfig-interface';

export const AppConfigProviders = {
	provide: 'APP_CONFIG_GET',
	useFactory: async (config: ConfigService, http: HttpService, kafka: KafkaService): Promise<AppConfigInterface> => {
		const appushHost = config.get('appushHost');
		const { key, secret } = config.get('push');
		return await http.post(`${appushHost}/v2/api/query/config`, {}, {
			headers: {
				key: key,
				secret: secret,
			}
		}).toPromise().then(res => {
			const data = res.data.data;
			return data
		}).catch(e => {
			kafka.error({
				decx: '获取config失败，请确认应用是否已经启动。',
				error: e.toString()
			});
			return {};
		});
	},
	inject: [ConfigService, HttpService, KafkaService]
};
