import { ConfigService } from '../config/config.service';

export const KafkaConnectionProviders = {
	provide: 'KAFKA_CONNECTION',
	useFactory: (config): any => {
		const Kafka = require('kafka-node');
		const kafkaConfig = config.get('kafka') || {};
		const Producer = Kafka.Producer;

		if(!kafkaConfig.host) return 
		const client = new Kafka.KafkaClient({ kafkaHost: kafkaConfig.host });
		const producer = new Producer(client);
		return producer;
	},
	inject: [ConfigService]
};
