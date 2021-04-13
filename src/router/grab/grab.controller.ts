
import { Controller, Get, HttpService, Query, UsePipes } from '@nestjs/common';
import { GrabService } from './grab.service';
import { KafkaService } from '../../common/providers/kafka/kafka.service';
import { GrabJoiValidationPipe } from './grab.pipe';
import { GrabDataDto } from './grab.dto';
import * as moment from 'moment';


@Controller('/grab')
export class GrabController {
	constructor(
		private readonly grabService: GrabService,
		private readonly kafka: KafkaService,
		private readonly http: HttpService

	) { }

	@Get('/')
	// @UsePipes(new GrabJoiValidationPipe())
	async grab(@Query() params: GrabDataDto) {
		const res = await this.grabService.getByCtripVehicleID(['11137'])
		return res.data
		// const { pname, rname, plname, rlname, plat, plng, rlat, rlng, ptime, rtime } = params;
		// const queryTime = new Date();
		// const qid = this.grabService.createQueryId(params);
		// const cars = await this.grabService.findCars(qid, queryTime);
		// if(cars){
		// 	return cars;
		// }
		
		// const data = await this.grabService.createCars({ 
		// 	qid, 
		// 	queryTime, 
		// 	pname, 
		// 	rname, 
		// 	plname, 
		// 	rlname, 
		// 	plat, 
		// 	plng, 
		// 	rlat, 
		// 	rlng, 
		// 	ptime, 
		// 	rtime,
		// 	status: '0',
		// })

		// const [
		// 	ctripResult,
		// 	zzcResult
		// ] = await Promise.all([
		// 	this.http.request({
		// 		url: 'http://127.0.0.1:6001/grab/ctrip',
		// 		method: 'get',
		// 		params: {
		// 			...params,
		// 			ptime: moment(Number(ptime)).format('YYYYMMDDHHmmss'), 
		// 			rtime: moment(Number(rtime)).format('YYYYMMDDHHmmss')
		// 		}
		// 	}).toPromise(),
		// 	this.http.request({
		// 		url: 'http://127.0.0.1:6001/grab/zzc',
		// 		method: 'get',
		// 		params: {
		// 			...params,
		// 			ptime: Math.floor(Number(ptime) / 1000), 
		// 			rtime: Math.floor(Number(rtime) / 1000)
		// 		}
		// 	}).toPromise()
		// ])

		// const saveResult = await this.grabService.updateCars(data._id, { 
		// 	status: '200',
		// 	ctripResult: ctripResult.data.result, 
		// 	zzcResult: zzcResult.data.result, 
		// 	queryUrl: ctripResult.data.queryUrl, 
		// 	clid: zzcResult.data.clid, 
		// })

		// return saveResult;
	}

	@Get('/ctrip')
	@UsePipes(new GrabJoiValidationPipe())
	async getCtripList(@Query() params: GrabDataDto) {
		const { pname, rname, plname, rlname, plat, plng, rlat, rlng, ptime, rtime } = params;
		
		const [pcid, rcid] = await Promise.all([
			this.grabService.getCtripCityId(pname),
			this.grabService.getCtripCityId(rname)
		]);
		
		if(!pcid||!rcid){
			return {
				code: 404,
				msg: '城市不存在'
			}
		}

		const {result, queryUrl} = await this.grabService.getCtripCarList({pcid, rcid, plat, plng, rlat, rlng, ptime, rtime, plname, rlname});

		return { queryUrl, result}

	}

	@Get('/zzc')
	@UsePipes(new GrabJoiValidationPipe())
	async getZZCList(@Query() params: GrabDataDto) {
		const { pname, rname, plname, rlname, plat, plng, rlat, rlng, ptime, rtime } = params;
		
		const [pcid, rcid] = await Promise.all([
			this.grabService.getZZCCityId(pname),
			this.grabService.getZZCCityId(rname)
		]);
		
		if(!pcid||!rcid){
			return {
				code: 404,
				msg: '城市不存在'
			}
		}
		const { clid, result } = await this.grabService.getZZCCarList({pcid, rcid, plat, plng, rlat, rlng, ptime, rtime, plname, rlname});
		return {clid, result: result}
	}


	@Get('/format')
	// @UsePipes(new GrabJoiValidationPipe())
	async format(@Query() params) {
		const { id } = params;
		const {ctripResult, zzcResult} = await this.grabService.getCars(id);
		const ctripCars = {};
		const zzcCars = {};
		const resultList = [];
		for(const vehicleList of ctripResult.vehicleList){
			ctripCars[vehicleList.vehicleCode] = vehicleList;
		}

		for(const list of zzcResult.data.list){
			zzcCars[list.list_id] = list;
		}

		const ctripVehicleID = await this.grabService.getByCtripVehicleID(Object.keys(ctripCars));
		const allCars = ctripVehicleID.data.data.list;


		for(let id in ctripCars){
			let ctripData = {};
			let zzcData = {};
			// 找到携程车型对应价格
			here: for(const productGroups of ctripResult.productGroups){
				for(const productList of productGroups.productList){
					if(id === productList.vehicleCode){
						ctripData = {
							...ctripCars[id],
							vendorPriceList: productList.vendorPriceList,
						};
						break here;
					}
				}
			}

			for(const cars of allCars){
				if(cars.ctrip.carTypeCode === id && cars.zzc){
					
				}
			}

			
			resultList.push({
				ctripData,
				zzcData
			})
		}
		return {
			// allCars,
			resultList
		}
	}

	// @Get('/getSupplier')
	// getSupplier() {
	// 	const p = new Promise(async (resolve) => {
	// 		for(let item of city){
	// 			const { id, defaultArea, name, provinceName } = item;
	// 			const res = await this.getListService.getCarList({pcid: id, rcid: id, plat: '', plng: '', rlat: '', rlng: '', ptime: '20210326130000', rtime: '20210328130000'});
	// 			if(res?.data?.productGroups && res.data.productGroups.length > 0){
	// 				const arr = res.data.vendorList.map(item => item.vendorName);
	// 				const text = arr.join('\n');
	// 				console.log(path.resolve(__dirname, `../../../../../ctrip/${name}-${provinceName}.txt`));
	// 				fs.writeFileSync(path.resolve(__dirname, `../../../../../ctrip/${name}-${provinceName}.txt`), text);
	// 			}
	// 		}
	// 		resolve({})
	// 	})
		

	// 	return {};
	// }
}