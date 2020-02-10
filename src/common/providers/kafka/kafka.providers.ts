import * as Kafka from 'kafka-node';
import { ConfigService } from '../config/config.service';
const Producer = Kafka.Producer;

export const KafkaConnectionProviders = {
	provide: 'KAFKA_CONNECTION',
	useFactory: (config: ConfigService): any => {
		const kafkaConfig = config.get('kafka') || {};
		const client = new Kafka.KafkaClient({ kafkaHost: kafkaConfig.host });
		const producer = new Producer(client);
		return producer;
	},
	inject: [ConfigService]
};
