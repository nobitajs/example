import * as mongoose from 'mongoose';

export interface MongoInterface {
	list: any,
	pages: {
		total: Number,
		page: Number,
		length: Number
	},
	errorMessage: mongoose.Error
};
