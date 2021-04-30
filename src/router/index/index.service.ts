import { Injectable, Inject } from '@nestjs/common';
import { MongoService } from '../../common/providers/mongodb/mongodb.service';

@Injectable()
export class IndexService {

	constructor(
		@Inject('CARS_PRICE_TBL') private readonly cars_price_tbl: MongoService,
	) {

	}

	async getCarList(params: any = {}){
		const query = params.id ? {_id: params.id || null} : {}
		return this.cars_price_tbl.find(query, {
			sort: {
				queryTime: -1
			},
			page: params.page || 0,
			limit: params.limit || 20,
			filter: {
				qid: 1,
				pname: 1,
				rname: 1,
				plname: 1,
				rlname: 1,
				plat: 1,
				plng: 1,
				rlat: 1,
				rlng: 1,
				ptime: 1,
				rtime: 1,
				queryTime: 1,
				status: 1,
				queryUrl: 1,
				clid: 1,
			}
		});
	}
}
