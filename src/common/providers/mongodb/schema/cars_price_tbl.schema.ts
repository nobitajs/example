import * as mongoose from 'mongoose';
const Mixed = mongoose.Schema.Types.Mixed;
export const cars_price_tbl = {
    qid: {
		type: String,
		index: true
	},
    // ctripResult: Mixed,
	// zzcResult: Mixed,
    clid: String,
    pname: String,
	rname: String,
	plname: String,
	rlname: String,
	plat: String,
	plng: String,
	rlat: String,
	rlng: String,
	ptime: String,
	rtime: String,
	queryTime: Date,
	queryUrl: String,
	status: String,
};