import axios from 'axios';
import { Injectable, Inject } from '@nestjs/common';
import { MongoService } from '../../common/providers/mongodb/mongodb.service';
import { HelperService } from '../../common/providers/helper/helper.service';


@Injectable()
export class UpdateCityService {

	constructor(
		@Inject('CTRIP_ZUCHE_CITY_TBL') private readonly ctrip_zuche_city_tbl: MongoService,
		private readonly helper: HelperService
	) {

	}

	update(list){
		return this.ctrip_zuche_city_tbl.insertMany(list);
	}

}
