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

	push: {
		key: 'admin',
		secret: 'bnUPx6OyMBVcdca7l9U6uoNJnIX2QgPm',
	},
	appushHost: 'https://appush.zuzuche.net',

};
export default config;