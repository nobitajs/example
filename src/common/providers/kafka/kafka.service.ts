import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import * as IP from 'ip';
import * as moment from 'moment';

@Injectable()
export class KafkaService {

	constructor(
		@Inject(ConfigService) private readonly config: ConfigService,
		@Inject('KAFKA_CONNECTION') private readonly producer: any
	) {
		this.ip = IP.address();
		this.env = this.config.get('env');
		this.pid = process.pid;
		this.producer && this.producer.on('ready', () => {
			this.log('kafka链接成功');
		})
		.on('error', () => {
			this.log('kafka链接失败');
		});
	}

	env: string
	ip: string
	pid: number

	public log(data: object | string) {
		this.send(data, 'log');
	}

	public error(data: object | string) {
		this.send(data, 'error');
	}

	public warn(data: object | string) {
		this.send(data, 'warn');
	}

	private send(data, type) {
		const kafkaConfig = this.config.get('kafka');
		const logData = ({
			logType: type,
			appName: this.config.get('appName') || 'app',
			env: this.env,
			ip: this.ip,
			pid: this.pid,
			time: moment().format('YYYY-MM-DD HH:mm:ss'),
			data
		});
		if (this.env == 'local' || !kafkaConfig) {
			console.log(logData);
		} else {
			this.producer.send([{
				topic: kafkaConfig.topic,
				messages: JSON.stringify(logData)
			}], (err) => {
				err && console.log(err);
			});
		}
	}

}
