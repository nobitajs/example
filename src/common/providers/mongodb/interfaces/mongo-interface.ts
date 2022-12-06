import * as mongoose from 'mongoose';

export interface MongoInterface {
	list: Array<Object>,
	pages: {
		total: Number,
		page: Number,
		length: Number
	},
	errorMessage: mongoose.Error
};
