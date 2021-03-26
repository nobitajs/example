
import { Controller, Get, Inject, Query, UsePipes } from '@nestjs/common';
import { GetListService } from './getList.service';
import { KafkaService } from '../../common/providers/kafka/kafka.service';
import { GetListJoiValidationPipe } from './getList.pipe';
import { GetListDataDto } from './getList.dto';
import city from '../../../city';
import * as fs from 'fs';
import * as path from 'path';

@Controller('/getList')
export class GetListController {
	constructor(
		private readonly getListService: GetListService,
		private readonly kafka: KafkaService,
	) { }

	@Get()
	// @UsePipes(new GetListJoiValidationPipe())
	async getList(@Query() data: GetListDataDto) {
		// const { pname, rname, plat, plng, rlat, rlng, ptime, rtime } = data;
		// let carList = [];
		
		// const [pcid, rcid] = await Promise.all([
		// 	this.getListService.getCityId(pname),
		// 	this.getListService.getCityId(rname)
		// ]);
		// const params = await this.getListService.getCarListParams({pcid, rcid, plat, plng, rlat, rlng, ptime, rtime});
		// const res = await this.getListService.sendGetCarListToCtrip(params);
		// if(res?.data?.productGroups && res.data.productGroups.length > 0){
		// 	for(let productGroups of res.data.productGroups){
		// 		for(let productList of productGroups.productList){
		// 			const {vehicleCode} = productList;
		// 			let newCarInfo = {
		// 				brandName: null,
		// 				name: null,
		// 				doorNo: null,
		// 				passengerNo: null,
		// 				transmissionName: null,
		// 				vehicleCode: null,
		// 				vendorPriceList: []
		// 			};
		// 			for(let carInfo of res.data.vehicleList){
		// 				if(carInfo.vehicleCode === vehicleCode){
		// 					newCarInfo.name = carInfo.name;
		// 					newCarInfo.brandName = carInfo.brandName;
		// 					newCarInfo.doorNo = carInfo.doorNo;
		// 					newCarInfo.passengerNo = carInfo.passengerNo;
		// 					newCarInfo.transmissionName = carInfo.transmissionName;
		// 					newCarInfo.vehicleCode = vehicleCode;
		// 					break;
		// 				}
		// 			}
		// 			for(let vendorPriceList of productList.vendorPriceList){
		// 				let newVendorPriceList = {
		// 					vendorName: vendorPriceList.vendorName,
		// 					currentDailyPrice: vendorPriceList.priceInfo.currentDailyPrice,
		// 					currentTotalPrice: vendorPriceList.priceInfo.currentTotalPrice,
		// 				}
		// 				newCarInfo.vendorPriceList.push(newVendorPriceList)
		// 			}
		// 			carList.push(newCarInfo)
		// 		}
		// 	}
		
		// }

		return city;
	}

	@Get('/getSupplier')
	getSupplier(@Query() data: GetListDataDto) {
		const p = new Promise(async (s) => {
			for(let item of city){
				const { id, defaultArea, name, provinceName } = item;
				const res = await this.getListService.getCarListParams({pcid: id, rcid: id, plat: defaultArea.lat, plng: defaultArea.lon, rlat: defaultArea.lat, rlng: defaultArea.lon, ptime: '20210326130000', rtime: '20210328130000'});
				if(res?.data?.productGroups && res.data.productGroups.length > 0){
					const arr = res.data.vendorList.map(item => item.vendorName);
					const text = arr.join('\n');
					console.log(path.resolve(__dirname, `../../../../../ctrip/${name}-${provinceName}.txt`));
					fs.writeFileSync(path.resolve(__dirname, `../../../../../ctrip/${name}-${provinceName}.txt`), text);
				}
			}
			s({})
		})
		

		return {};
	}
}