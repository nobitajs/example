import * as mongoose from 'mongoose';
const Mixed = mongoose.Schema.Types.Mixed;
export const cars_price_format_tbl = {
    lid: {
		type: String,
		unique: true
	},
    list: Mixed,
    ctripCars: Number,
    zzcCars: Number,
};