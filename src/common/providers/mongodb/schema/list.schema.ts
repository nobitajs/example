import { Schema } from 'mongoose';

export const list = {
	name: {
		type: Schema.Types.String,
		required: true,
		unique: true
	},
	key: {
		type: Schema.Types.String,
		required: true,
		unique: true
	},
	host: {
		type: Schema.Types.String,
		required: true,
	},

}