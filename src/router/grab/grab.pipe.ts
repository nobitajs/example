import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { GrabDataDto } from './grab.dto';
import { RejectExceptionsFilter } from '../../common/exception/reject.exception';

const addDataPipe = Joi.object({
	pname: Joi.string().empty().required(),
	rname: Joi.string().empty().required(),
	plname: Joi.string().empty().required(),
	rlname: Joi.string().empty().required(),
	plat: Joi.string().empty().required(),
	plng: Joi.string().empty().required(),
	rlat: Joi.string().empty().required(),
	rlng: Joi.string().empty().required(),
	ptime: Joi.string().empty().required(),
	rtime: Joi.string().empty().required(),
});


@Injectable()
export class GrabJoiValidationPipe implements PipeTransform {
	transform(data: GrabDataDto, metadata: ArgumentMetadata) {
		const { error, value } = addDataPipe.validate(data, { allowUnknown: true });
		if (error) {
			throw new RejectExceptionsFilter(400, error.toString());
		}
		
		return value;
	}
}






