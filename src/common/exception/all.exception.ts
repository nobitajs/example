import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { KafkaService } from '../providers/kafka/kafka.service';
import { ConfigService } from '../providers/config/config.service';
import { RejectExceptionsFilter } from './reject.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	constructor(
		@Inject(KafkaService) private readonly kafka: KafkaService,
		@Inject(ConfigService) private readonly config: ConfigService
	) {

	}
	
	ctx: any
	exception: any
	response: any
	request: any

	catch(exception: any, host: ArgumentsHost) {
		this.ctx = host.switchToHttp();
		this.exception = exception;
		this.response = this.ctx.getResponse();
		this.request = this.ctx.getRequest();
		switch (true) {
			case exception instanceof RejectExceptionsFilter:
				this.reject();
				break;
			default:
				this.default();
		}
	}

	public reject() {
		const status = this.exception.getStatus();
		this.response
			.status(403)
			.json({
				code: status,
				message: this.exception.message
			});
	}

	public default() {
		const message = this.exception.toString();
		const stack = this.exception.stack.toString();
		const query = this.request.query;
		const body = this.request.body;
		const header = this.request.headers;
		const debug = query['_debug'] || this.config.get('env') == 'local';
		const status = this.exception instanceof HttpException ? this.exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
		const errorData = {
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: this.request.url,
			body,
			query,
			header,
			error: {
				message,
				stack
			}

		};
		status != 404 && this.kafka.error(errorData);
		this.response
			.status(status)
			.json(debug ? errorData : {
				statusCode: status,
				timestamp: new Date().toISOString(),
				path: this.request.url,
			});
	}
}