import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { IndexAddUserDataDto } from './index.dto';
import { RejectExceptionsFilter } from '../../common/exception/reject.exception';

const addDataPipe = Joi.object({
	user: Joi.string().empty().required(),
	pwd: Joi.string().empty().required(),
});


@Injectable()
export class IndexAddUserJoiValidationPipe implements PipeTransform {
	transform(data: IndexAddUserDataDto, metadata: ArgumentMetadata) {
		const { error, value } = addDataPipe.validate(data, { allowUnknown: true });
		if (error) {
			throw new RejectExceptionsFilter(400, error.toString());
		}
		
		return value;
	}
}






