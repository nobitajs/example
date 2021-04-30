
import { Controller, Get, HttpService, Query, UsePipes } from '@nestjs/common';
import { GrabService } from './grab.service';
import { KafkaService } from '../../common/providers/kafka/kafka.service';
import { GrabJoiValidationPipe, GrabFormatJoiValidationPipe } from './grab.pipe';
import { GrabDataDto, FormatDataDto } from './grab.dto';
import * as moment from 'moment';


@Controller('/grab')
export class GrabController {
	constructor(
		private readonly grabService: GrabService,
		private readonly kafka: KafkaService,
		private readonly http: HttpService

	) { }

	@Get('/')
	@UsePipes(new GrabJoiValidationPipe())
	async grab(@Query() params: GrabDataDto) {
		const { pname, rname, plname, rlname, plat, plng, rlat, rlng, ptime, rtime } = params;
		const queryTime = new Date();
		const qid = this.grabService.createQueryId(params);
		const cars = await this.grabService.findCars(qid, queryTime);
		if(cars){
			return cars;
		}
		
		const data = await this.grabService.createCars({ 
			qid, 
			queryTime, 
			pname, 
			rname, 
			plname, 
			rlname, 
			plat, 
			plng, 
			rlat, 
			rlng, 
			ptime, 
			rtime,
			status: '0',
		})

		const [
			ctripResult,
			zzcResult
		] = await Promise.all([
			this.http.request({
				url: 'http://127.0.0.1:6001/grab/ctrip',
				method: 'get',
				params: {
					...params,
					ptime: moment(Number(ptime)).format('YYYYMMDDHHmmss'), 
					rtime: moment(Number(rtime)).format('YYYYMMDDHHmmss')
				}
			}).toPromise(),
			this.http.request({
				url: 'http://127.0.0.1:6001/grab/zzc',
				method: 'get',
				params: {
					...params,
					ptime: Math.floor(Number(ptime) / 1000), 
					rtime: Math.floor(Number(rtime) / 1000)
				}
			}).toPromise()
		])
		const saveResult = await this.grabService.updateCars(data._id, { 
			status: ctripResult.data.result.baseResponse.code === '200' && zzcResult.data.result.code === 0 ? '200' : '204',
			ctripResult: ctripResult.data.result, 
			zzcResult: zzcResult.data.result, 
			queryUrl: ctripResult.data.queryUrl, 
			clid: zzcResult.data.clid, 
		})

		return saveResult;
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
		return {clid, result}
	}


	@Get('/format')
	@UsePipes(new GrabFormatJoiValidationPipe())
	async format(@Query() params: FormatDataDto) {
		const { id } = params;
		
		let res = await this.grabService.getFormatData({lid: id});
		if(res){
			return res;
		}

		let [ctripResult, zzcResult] = await this.grabService.getCars(id);
		ctripResult = JSON.parse(ctripResult);
		zzcResult = JSON.parse(zzcResult);
		
		const resultList = await this.grabService.format(ctripResult, zzcResult);

		const saveResult = await this.grabService.saveFormatData({lid: id, list: resultList.list, ctripCars: resultList.ctripCars, zzcCars: resultList.zzcCars});
		return saveResult[0];
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