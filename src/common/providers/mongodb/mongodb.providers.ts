import * as mongoose from 'mongoose';
import AllSchema from './mongodb.schema';
import { MongoService } from './mongodb.service';
import { ConfigService } from '../config/config.service';
import * as merge from 'lodash/merge';

const provides = [];

for (const key in AllSchema) {
	Object.assign(AllSchema[key], {
		createTime: {
			type: Date,
			default: Date.now,
			required: true
		},
		updateTime: {
			type: Date,
			default: Date.now,
			required: true
		}
	});

	provides.push({
		provide: key.toLocaleUpperCase(),
		useFactory: (connection: mongoose.createConnection) => {
			return new MongoService(connection.name, key, connection.model(key, new mongoose.Schema(AllSchema[key]), key));
		},
		inject: ['MONGODB_CONNECTION'],
	});
}

export const MongodbConnectionProviders = [{
	provide: 'MONGODB_CONNECTION',
	useFactory: (config: ConfigService): Promise<mongoose.createConnection> => {
		const mongoConf = config.get('mongo');
		const option = merge({
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		}, mongoConf.option);
		const db = mongoose.createConnection(mongoConf.url, option);
		db.once("error", (err) => {
			console.log('system', `数据库链接失败:${err}`);
		});
		// 连接成功
		db.once("open", () => {
			console.log('system', '数据库链接成功');
		});
		// 断开数据库
		db.once("disconnected", () => {
			console.log('system', '数据库断开');
		});
		return db;
	},
	inject: [ConfigService]
},
{
	provide: 'CREATE_TABLE',
	useFactory: (connection: mongoose.createConnection) => {
		return (name: string, schema: object) => {
			if (!connection.models[name]) {
				return connection.model(name, schema, name);
			}
			return connection.models[name];

		}
	},
	inject: ['MONGODB_CONNECTION'],
},
{
	provide: 'DATABASES_LIST',
	useFactory: (connection: mongoose.createConnection) => {
		return async (isAll: boolean = true) => {
			let cols = await connection.db.collections();
			let tableNames = [];
			for (let c of cols) {
				tableNames.push(c.namespace.split('.')[1]);
			}
			return isAll ? tableNames : Object.keys(connection.models);
		}
	},
	inject: ['MONGODB_CONNECTION'],
},
...provides,
];
