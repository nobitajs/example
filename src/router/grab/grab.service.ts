import axios from 'axios';
import { Injectable, Inject, HttpService } from '@nestjs/common';
import { MongoService } from '../../common/providers/mongodb/mongodb.service';
// import { MongoInterface } from '../../common/providers/mongodb/interfaces/mongo-interface';
import { HelperService } from '../../common/providers/helper/helper.service';
import { ConfigService } from '../../common/providers/config/config.service';
import { GetCarListParamsDto, GrabDataDto, MongoCarsCreateDataDto, MongoCarsUpdateDataDto } from './grab.dto';
import * as crypto from 'crypto'


const storeList = {
	'鲲鹏租车': '悟空租车'
}
@Injectable()
export class GrabService {

	constructor(
		@Inject('ZZC_ZUCHE_CITY_TBL') private readonly zzc_zuche_city_tbl: MongoService,
		@Inject('CTRIP_ZUCHE_CITY_TBL') private readonly ctrip_zuche_city_tbl: MongoService,
		@Inject('CARS_PRICE_TBL') private readonly cars_price_tbl: MongoService,
		@Inject('CARS_PRICE_FORMAT_TBL') private readonly cars_price_format_tbl: MongoService,
		@Inject('REDIS_CONNECTION') private readonly redis: any,
		
		private readonly helper: HelperService,
		private readonly config: ConfigService,
		private readonly http: HttpService
	) {

	}

	async getCtripCityId(name: string): Promise<string|undefined>{
		const res =  await this.ctrip_zuche_city_tbl.findOne({name})
		return res?.id;
	}

	async getZZCCityId(name: string, type: String = 'ctrip'): Promise<string|undefined>{
		const res =  await this.zzc_zuche_city_tbl.findOne({name})
		return res?.code;
	}

	getCtripCarList(data: GetCarListParamsDto): Promise<any>{
		const {pcid, rcid, plat, plng, rlat, rlng, ptime, rtime} = data;
		let first = true;
		return new Promise(async (resolve, reject) => {
			const queryUrl = `https://m.ctrip.com/webapp/cw/rn_car_app/Market.html?fromurl=common&landingto=List&apptype=ISD_C_CW&filters=false&st=ser&CRNModuleName=rn_car_app&pcid=${pcid}&ptime=${ptime}&rtime=${rtime}&rcid=${rcid}&plat=${plat}&plng=${plng}&rlat=${rlat}&rlng=${rlng}&ouid=`;
			const browser: any = await this.helper.puppeteer();
			const proxyAuthConfig = {
				username: this.helper.getUserName({
					sessionId: true
				}),
				password: this.helper.getPassword(),
			};
 
			// // 先打开首页注入cookie
			// const page1 = await browser.newPage();
			// await page1.authenticate(proxyAuthConfig);
			// await page1.goto('https://m.ctrip.com/html5/carhire');
			
			// 再打开列表页
			const page = await browser.newPage();
			await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1')
			await page.setRequestInterception(true);
			await page.authenticate(proxyAuthConfig);
			await page.setCacheEnabled(false);
			const  listener = async (request) => {
				const url = request.url();
				if(url.indexOf('https://m.ctrip.com/restapi/soa2/18631/queryProducts') !== -1){
					request.abort();
					// 因为页面会重定向，所以只需监听重定向后的路由就好了
					// abort了请求，前端会重试，避免id只能请求一次，所以拦截所有请求
					if(first && page.url().indexOf('https://m.ctrip.com/webapp/cw/rn_car_app/List.html')){
						first = false;
						await this.helper.sleep(1000);
						const cookies = await page.cookies();
						const cookie = cookies.map(item => {
							if(!['_RGUID', '_RSG', '_RDG', '_lizard_LZ', 'MKT_Pagesource', '_bfa'].includes(item.name)){
								return null
							}
							return `${item.name}=${item.value}`;
						}).filter(item => item).join('; ');

						// 返回主体过大，puppeteer无法解析，只能额外使用node发起请求
						const {data: result}: any = await this.http.request({
							url: request.url(),
							method: 'post',
							data: JSON.parse(request.postData()),
							// headers: {
							// 	'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
							// }
							headers: {
								...request.headers(),
								cookie
							}	
						}).toPromise().catch(e => {
							console.log(request.url(), '失败')
							return {}
						})
						await page.off('request', listener)
						await browser.close();
						resolve({result, queryUrl});
					}
					
				}else{
					request.continue();
				}
			}
			
			page.on('request', listener)
			await page.goto(queryUrl);
		})
		
	}


	async getZZCCarList(data: GetCarListParamsDto): Promise<any>{
		const {data: getClidResult} = await this.http.request({
			url: 'http://api-crc.int.zuzuche.com/backend/search/create',
			method: 'post',
			data: {
				_source: 60,
				pickup: {
					cityCode: data.pcid,
					time: data.ptime,
					lat: data.plat,
					lng: data.plng,
					landmarkId: "0",
					landmarkName: data.plname,
					landmarkType: "",
					toDoor: "0",
					provinceCode: 0,
				},
				dropoff: {
					cityCode: data.rcid,
					time: data.rtime,
					lat: data.plat,
					plng: data.plng,
					landmarkId: "0",
					landmarkName: data.rlname,
					landmarkType: "",
					toDoor: "0",
					provinceCode: 0,
				}
			}
		}).toPromise();
		
		await this.helper.sleep(3000);
		if(getClidResult.code === 0){
			const clid = getClidResult.data.clid;
			const {data: result} = await this.http.request({
				url: 'http://api-crc.int.zuzuche.com/frontend/search/v2/list',
				method: 'post',
				data: {
					_source: 60,
					clid
				}
			}).toPromise();

			return {clid, result}
		}

		return { result: getClidResult }
	}


	async createCars(data: MongoCarsCreateDataDto){
		return this.cars_price_tbl.insert(data);
	}

	async updateCars(_id: String, data: MongoCarsUpdateDataDto){
		await this.cars_price_tbl.updateOne({_id}, data);
		const resultRedisKey = this.config.get('resultRedisKey');
		const redisExpTime = this.config.get('redisExpTime');
		await this.redis.hset(`${resultRedisKey}_${_id}`, 'ctrip' , JSON.stringify(data.ctripResult))
		await this.redis.hset(`${resultRedisKey}_${_id}`, 'zzc' , JSON.stringify(data.zzcResult))
		await this.redis.expire(`${resultRedisKey}_${_id}`, redisExpTime);
		return this.cars_price_tbl.findOne({_id});
	}

	async getCars(_id: String){
		const resultRedisKey = this.config.get('resultRedisKey');
		return Promise.all([
			this.redis.hget(`${resultRedisKey}_${_id}`, 'ctrip'),
			this.redis.hget(`${resultRedisKey}_${_id}`, 'zzc')
		]);
	}

	findCars(qid: String, queryTime: Date){
		const cacheTime = this.config.get('cacheTime');
		return this.cars_price_tbl.findOne({qid, queryTime: {$gte: queryTime.getTime() - cacheTime}});
	}

	// 生成查询id规则
	createQueryId(data: GrabDataDto): String{
		return crypto.createHash('md5').update(`${data.pname}|${data.rname}|${data.plat}|${data.plng}|${data.rlat}|${data.rlng}|${data.ptime}|${data.rtime}`).digest('hex')
	}

	async format(ctripResult, zzcResult){
		const ctripCars = {};
		const zzcCars = {};
		const ctripCarsMap = {};
		const zzcCarsMap = {};
		const resultList = [];
		let zzcLength = 0;
		// 格式化携程数据
		for(const vehicleList of ctripResult.vehicleList){
			ctripCars[vehicleList.vehicleCode] = vehicleList;
			
		}

		for(const list of zzcResult.data.list){
			for(let car of list.groups_list){
				car.dealerName = zzcResult.data.vars.dealers[car.dealerId].name;
				car.dealerCtripName = storeList[car.dealerName];
				zzcLength++;
			}
			zzcCars[list.list_id] = list;
		}

		const ctripVehicleID = await this.getByCtripVehicleID(Object.keys(ctripCars));
		const allCars = ctripVehicleID.data.data.list;
		for(let id in ctripCars){
			// 找到携程车型对应价格
			for(const productGroups of ctripResult.productGroups){
				for(const productList of productGroups.productList){
					if(id === productList.vehicleCode){
						for(let vendorPrice of productList.vendorPriceList){
							const key = `${productList.vehicleCode}_${(vendorPrice.vendorName)}`;
							// 格式化携程数据
							ctripCarsMap[key] =  {
								name: ctripCars[id].name,
								vehicleCode: ctripCars[id].vehicleCode,
								vendorPrice,
							}
						}
					}
				}
			}

			// 找到携程车型对应租租车车型id
			for(const cars of allCars){
				if(cars.ctrip.carTypeCode === id && cars.zzc.carTypeCode && zzcCars[cars.zzc.carTypeCode]){
					for(const car of zzcCars[cars.zzc.carTypeCode].groups_list){
						const key = `${id}_${(car.dealerCtripName || car.dealerName)}`;
						// 格式化租租车数据
						zzcCarsMap[key] =  {
							list_id: zzcCars[cars.zzc.carTypeCode].list_id,
							brand: zzcCars[cars.zzc.carTypeCode].brand,
							title: zzcCars[cars.zzc.carTypeCode].title,
							vendorPrice: car
						}
					}
					
					// 删除已添加车型
					delete zzcCars[cars.zzc.carTypeCode];
					break;
				}
			}
		}

		// 生成结果数组
		for(let key in ctripCarsMap){
			resultList.push({
				name: ctripCarsMap[key].name,
				ctrip: ctripCarsMap[key],
				zzc: zzcCarsMap[key],
			});
			// 删除已添加车型
			delete zzcCarsMap[key];
		}

		// 添加剩余未匹配的租租车数据
		for(let key in zzcCarsMap){
			resultList.push({
				name: zzcCarsMap[key].title,
				zzc: zzcCarsMap[key]
			})
		}

		// 添加剩余未匹配的租租车数据 
		for(let id in zzcCars){
			for(const car of zzcCars[id].groups_list){
				resultList.push({
					name: zzcCars[id].title,
					zzc: {
						list_id: zzcCars[id].list_id,
						brand: zzcCars[id].brand,
						title: zzcCars[id].title,	
						vendorPrice: car
					},
				})
			}
		}

		return {
			list: resultList,
			ctripCars: Object.keys(ctripCarsMap).length,
			zzcCars: zzcLength,
		};
	}

	// 保存格式化后数据
	saveFormatData(data){
		return this.cars_price_format_tbl.insertMany(data);
	}

	getFormatData(data){
		return this.cars_price_format_tbl.findOne(data);
	}

	getByCtripVehicleID(ctripVehicleIDs) {
		return this.http.request({
			url: 'http://msa-zuul.zuzuche.com/supplier-center/standardCar/ctrip',
			method: 'post',
			data: {
				carIds: ctripVehicleIDs,
			}
		}).toPromise();
	}


}
