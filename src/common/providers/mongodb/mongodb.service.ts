import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class MongoService {

	constructor(databaseName, collectionName, model) {
		this.databaseName = databaseName;
		this.collectionName = collectionName;
		this.model = model;
	}
	databaseName: string
	collectionName: string
	model: Model

	async find(sql: any, options: any = {}): Promise<any> {
		const startTime = new Date().getTime();
		options.page = +(options.page || 0);
		options.limit = +(options.limit || 20);
		options.skip = options.page * options.limit || 0;
		return await Promise.all([
			this.model.countDocuments(sql),
			this.model.find(sql, options.filter, options)
		]).then(([total, list]) => {
			const endTIme = new Date().getTime();
			console.log('system', {
				useTime: endTIme - startTime,
				databaseName: this.databaseName,
				collectionName: this.collectionName,
				type: 'find',
				sql,
				options
			});
			return {
				list: list,
				pages: {
					total,
					page: options.page,
					length: list.length
				}
			};
		}).catch(error => {
			const endTIme = new Date().getTime();
			console.error('systemError', {
				useTime: endTIme - startTime,
				databaseName: this.databaseName,
				collectionName: this.collectionName,
				type: 'find',
				sql,
				options,
				error
			});
			return null;
		});
	}

	async findOne(sql: any, options: any = {}): Promise<any> {
		const startTime = new Date().getTime();
		return await this.model.findOne(sql, options.filter, options).then((data) => {
			const endTIme = new Date().getTime();
			console.log('system', {
				useTime: endTIme - startTime,
				databaseName: this.databaseName,
				collectionName: this.collectionName,
				type: 'findOne',
				sql,
				options
			});
			return data;
		}).catch(error => {
			const endTIme = new Date().getTime();
			console.error('systemError', {
				useTime: endTIme - startTime,
				databaseName: this.databaseName,
				collectionName: this.collectionName,
				type: 'findOne',
				sql,
				options,
				error
			});
			return null;
		});
	}

	async insertMany(sql: any): Promise<any> {
		const startTime = new Date().getTime();
		return await this.model.insertMany(sql).then((data) => {
			const endTIme = new Date().getTime();
			console.log('system', {
				useTime: endTIme - startTime,
				databaseName: this.databaseName,
				collectionName: this.collectionName,
				type: 'insertMany',
				sql,
			});
			return data;
		}).catch(error => {
			const endTIme = new Date().getTime();
			console.error('systemError', {
				useTime: endTIme - startTime,
				databaseName: this.databaseName,
				collectionName: this.collectionName,
				type: 'insertMany',
				sql,
				error
			});
			return null;
		});
	}

	async insert(sql: any): Promise<any> {
		const startTime = new Date().getTime();
		return await this.model.insertMany(sql).then((data) => {
			const endTIme = new Date().getTime();
			console.log('system', {
				useTime: endTIme - startTime,
				databaseName: this.databaseName,
				collectionName: this.collectionName,
				type: 'insert',
				sql,
			});
			return data[0];
		}).catch(error => {
			const endTIme = new Date().getTime();
			console.error('systemError', {
				useTime: endTIme - startTime,
				databaseName: this.databaseName,
				collectionName: this.collectionName,
				type: 'insert',
				sql,
				error
			});
			return null;
		});
	}

	async update(sql: any, newDate: any, params: any = {}): Promise<any> {
		const startTime = new Date().getTime();
		newDate.updateTime = +new Date();
		if (params.upsert) {
			params.setDefaultsOnInsert = true;
		}

		return await this.model.updateMany(sql, newDate, params).then((data) => {
			const endTIme = new Date().getTime();
			console.log('system', {
				useTime: endTIme - startTime,
				databaseName: this.databaseName,
				collectionName: this.collectionName,
				type: 'update',
				sql,
				newDate,
				params
			});
			return data;
		}).catch(error => {
			const endTIme = new Date().getTime();
			console.error('systemError', {
				useTime: endTIme - startTime,
				databaseName: this.databaseName,
				collectionName: this.collectionName,
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
		const startTime = new Date().getTime();
		newDate.updateTime = +new Date();
		if (params.upsert) {
			params.setDefaultsOnInsert = true;
		}

		return await this.model.updateOne(sql, newDate, params).then((data) => {
			const endTIme = new Date().getTime();
			console.log('system', {
				useTime: endTIme - startTime,
				databaseName: this.databaseName,
				collectionName: this.collectionName,
				type: 'update',
				sql,
				newDate,
				params
			});
			return data;
		}).catch(error => {
			const endTIme = new Date().getTime();
			console.error('systemError', {
				useTime: endTIme - startTime,
				databaseName: this.databaseName,
				collectionName: this.collectionName,
				type: 'update',
				sql,
				newDate,
				params,
				error
			});
			return null;
		});
	}

	async remove(sql: any): Promise<any> {
		const startTime = new Date().getTime();
		return await this.model.deleteMany(sql).then((data) => {
			const endTIme = new Date().getTime();
			console.log('system', {
				useTime: endTIme - startTime,
				databaseName: this.databaseName,
				collectionName: this.collectionName,
				type: 'remove',
				sql,
			});
			return data;
		}).catch(error => {
			const endTIme = new Date().getTime();
			console.log('system', {
				useTime: endTIme - startTime,
				databaseName: this.databaseName,
				collectionName: this.collectionName,
				type: 'remove',
				sql,
				error
			});
			return null;
		});
	}

	async removeOne(sql: any): Promise<any> {
		const startTime = new Date().getTime();
		return await this.model.deleteOne(sql).then((data) => {
			const endTIme = new Date().getTime();
			console.log('system', {
				useTime: endTIme - startTime,
				databaseName: this.databaseName,
				collectionName: this.collectionName,
				type: 'removeOne',
				sql,
			});
			return data;
		}).catch(error => {
			const endTIme = new Date().getTime();
			console.log('system', {
				useTime: endTIme - startTime,
				databaseName: this.databaseName,
				collectionName: this.collectionName,
				type: 'removeOne',
				sql,
				error
			});
			return null;
		});
	}

	async aggregate(sql: any): Promise<any> {
		const startTime = new Date().getTime();
		return await this.model.aggregate(sql).then((data) => {
			const endTIme = new Date().getTime();
			console.log('system', {
				useTime: endTIme - startTime,
				databaseName: this.databaseName,
				collectionName: this.collectionName,
				type: 'aggregate',
				sql,
			});
			return data;
		}).catch(error => {
			const endTIme = new Date().getTime();
			console.error('systemError', {
				useTime: endTIme - startTime,
				databaseName: this.databaseName,
				collectionName: this.collectionName,
				type: 'aggregate',
				sql,
				error
			});
			return null;
		});
	}

	async drop(): Promise<any> {
		const startTime = new Date().getTime();
		return await this.model.collection.drop().then((data) => {
			const endTIme = new Date().getTime();
			console.log('system', {
				useTime: endTIme - startTime,
				databaseName: this.databaseName,
				collectionName: this.collectionName,
				type: 'drop',
			});
			return data;
		}).catch(error => {
			const endTIme = new Date().getTime();
			console.log('system', {
				useTime: endTIme - startTime,
				databaseName: this.databaseName,
				collectionName: this.collectionName,
				type: 'drop',
				error
			});
			return null;
		});
	}

}
