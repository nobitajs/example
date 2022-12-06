import glob from 'glob';
import path from 'path';
let schema = {};

for (const src of glob.sync(path.resolve(__dirname, './schema/*.schema.d.ts'))) {
	const ts = require(src.split('.d.ts')[0]);
	schema = Object.assign(schema, ts);
}

export default schema;