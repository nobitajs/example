import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { KafkaService } from '../kafka/kafka.service';

@Injectable()
export class MongoService {

	constructor(model, kafka) {
		this.model = model;
		this.kafka = kafka;
	}
	model: Model
	kafka: KafkaService

	async find(sql: any, options: any = {}): Promise<any> {
		options.page = +(options.page || 0);
		options.limit = +(options.limit || 20);
		options.skip = options.page * options.limit || 0;
		return await Promise.all([
			this.model.countDocuments(sql),
			this.model.find(sql, options.filter, options)
		]).then(([total, list]) => {
			return {
				list: list,
				pages: {
					total,
					page: options.page,
					length: list.length
				}
			};
		}).catch(error => {
			this.kafka.error({
				type: 'find',
				sql,
				options,
				error
			});
			return null;
		});
	}

	async findOne(sql: any, options: any = {}): Promise<any> {
		return await this.model.findOne(sql, options.filter, options).then((data) => {
			return data;
		}).catch(error => {
			this.kafka.error({
				type: 'findOne',
				sql,
				options,
				error
			});
			return null;
		});
	}

	async insertMany(sql: any): Promise<any> {
		return await this.model.insertMany(sql).then((data) => {
			return data;
		}).catch(error => {
			this.kafka.error({
				type: 'insertMany',
				sql,
				error
			});
			return null;
		});
	}

	async insert(sql: any): Promise<any> {
		return await this.model.insertMany(sql).then((data) => {
			return data[0];
		}).catch(error => {
			this.kafka.error({
				type: 'insert',
				sql,
				error
			});
			return null;
		});
	}

	async update(sql: any, newDate: any, params: any = {}): Promise<any> {
		newDate.updateTime = +new Date();
		if (params.upsert) {
			params.setDefaultsOnInsert = true;
		}

		return await this.model.updateMany(sql, newDate, params).then((data) => {
			return data;
		}).catch(error => {
			this.kafka.error({
				type: 'update',
				sql,
				newDate,
				params,
				error
			});
			return null;
		});
	}

	async updateOne(sql: any, newDate: any, params: any = {}): Promise<any> {
		newDate.updateTime = +new Date();
		if (params.upsert) {
			params.setDefaultsOnInsert = true;
		}

		return await this.model.updateOne(sql, newDate, params).then((data) => {
			return data;
		}).catch(error => {
			this.kafka.error({
				type: 'updateOne',
				sql,
				newDate,
				params,
				error
			});
			return null;
		});
	}

	async remove(sql: any): Promise<any> {
		return await this.model.deleteMany(sql).then((data) => {
			return data;
		}).catch(error => {
			this.kafka.error({
				type: 'remove',
				sql,
				error
			});
			return null;
		});
	}

	async removeOne(sql: any): Promise<any> {
		return await this.model.deleteOne(sql).then((data) => {
			return data;
		}).catch(error => {
			this.kafka.error({
				type: 'removeOne',
				sql,
				error
			});
			return null;
		});
	}

	async aggregate(sql: any): Promise<any> {
		return await this.model.aggregate(sql).then((data) => {
			return data;
		}).catch(error => {
			this.kafka.error({
				type: 'aggregate',
				sql,
				error
			});
			return null;
		});
	}

	async drop(): Promise<any> {
		return await this.model.collection.drop().then((data) => {
			return data;
		}).catch(error => {
			this.kafka.error({
				type: 'drop',
				error
			});
			return null;
		});
	}

}
