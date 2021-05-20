import { ConfigService } from '../config/config.service';

export const KafkaConnectionProviders = {
	provide: 'KAFKA_CONNECTION',
	useFactory: (config): any => {
		const kafkaConfig = config.get('kafka') || {};
		const Kafka = require('kafka-node');
		if(!kafkaConfig.host) return
		const Producer = Kafka.Producer;
		const client = new Kafka.KafkaClient({ kafkaHost: kafkaConfig.host });
		const producer = new Producer(client);
		return producer;
	},
	inject: [ConfigService]
};
