import { HttpStatus, HttpException } from '@nestjs/common';

export class RejectExceptionsFilter extends HttpException {
	constructor(code: number = HttpStatus.FORBIDDEN, message?: string) {
		super(message, code);
	}

	
}