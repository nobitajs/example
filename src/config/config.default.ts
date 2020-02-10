const config = {
	
	redis: {
		port: 6379,          // Redis port
		host: '127.0.0.1',   // Redis host
		family: 4,           // 4 (IPv4) or 6 (IPv6)
		db: 0
	},

	mongo: {
		url: 'mongodb://127.0.0.1:27017/app_push',
	},

};
export default config;