
import { Controller, Get, Inject, Query, UsePipes } from '@nestjs/common';
import { UpdateCityService } from './updateCity.service';
import { KafkaService } from '../../common/providers/kafka/kafka.service';
import city from '../../../city';
import * as fs from 'fs';
import * as path from 'path';
@Controller('/updateCity')
export class UpdateCityController {
	constructor(
		private readonly updateCityService: UpdateCityService,
		private readonly kafka: KafkaService,
	) { }

	@Get('/')
	updateCity(){
		const p = new Promise(async () => {
			for(let item of city){
				const { name, ename, id, py, spy, provinceName, provinceEName, provinceId, countryid, countryName, countryEName} = item;
				await this.updateCityService.update([{name, ename, id, py, spy, provinceName, provinceEName, provinceId, countryid, countryName, countryEName}]).catch(e => {})
			}
			console.log('更新完成')
		})
		

		return {};
	}
}