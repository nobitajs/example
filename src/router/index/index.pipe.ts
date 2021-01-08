import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { IndexDataDto } from './index.dto';
import { RejectExceptionsFilter } from '../../common/exception/reject.exception';

const addDataPipe = Joi.object({
	urls: Joi.array().empty().required(),
});


@Injectable()
export class IndexAddUserJoiValidationPipe implements PipeTransform {
	transform(data: IndexDataDto, metadata: ArgumentMetadata) {
		const { error, value } = addDataPipe.validate(data, { allowUnknown: true });
		if (error) {
			throw new RejectExceptionsFilter(400, error.toString());
		}
		
		return value;
	}
}





