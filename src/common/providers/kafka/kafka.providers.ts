export const KafkaConnectionProviders = {
	provide: 'KAFKA_CONNECTION',
	useFactory: (): any => {
		const Kafka = require('kafka-node');
		const Producer = Kafka.Producer;
		const client = new Kafka.KafkaClient({ kafkaHost: 'kafka1.bigdata.zuzuche.info:9092,kafka2.bigdata.zuzuche.info:9092,kafka3.bigdata.zuzuche.info:9092' });
		const producer = new Producer(client);
		return producer;
	},
};
