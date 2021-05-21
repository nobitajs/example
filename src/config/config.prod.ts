export default {
	mongo: {
		url: 'mongodb://10.2.248.104:62600/spiders',
		option: {
			user: 'crc_mongo',
			pass: 'Crc2019)&!!',
			authSource: 'admin',
			poolSize: 100,
			auto_reconnect: true,
			//启用长连接  
			keepAlive: 1,
			//重试次数
			reconnectTries: 10000,
			//重试间隔
			reconnectInterval: 1000,
		},
	},
	// redis: {
	// 	port: 63379,
	// 	host: 'redis.rocketos-middleware-dev.svc.rocketos.local',
	// 	password: 'DNtoxikc8JZM',
	// 	db: 4,
	// },
};