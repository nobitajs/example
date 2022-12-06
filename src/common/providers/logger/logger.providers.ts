import { ConfigService } from '../config/config.service';
import log4js from 'log4js';

// declare var console
export const LoggerInitProviders = {
	provide: 'LOGGER_INIT',
	useFactory: (config: ConfigService): any => {
		const env = config.get('env')
		log4js.configure({
			appenders: { 
				local: { 
					type: "console", 
				},
				prod: { 
					type: "dateFile", 
					pattern: "yyyyMMdd.log",
					filename: "./logs/web-log",
					alwaysIncludePattern: true,
					numBackups: 30,
				},
		
			},
			categories: { 
				default: { 
					appenders: ["local"], level: "all" 
				},
				prod: { 
					appenders: ["prod"], level: "all" 
				}
			},
		});
		const logger = log4js.getLogger(env);
		console.warn = (msg, ...args) => logger.warn(msg, ...args);
		console.error = (msg, ...args) => logger.error(msg, ...args);
		console.trace = (msg, ...args) => logger.trace(msg, ...args);
		console.log = (msg, ...args) => logger.info(msg, ...args);
		console.debug = (msg, ...args) => logger.debug(msg, ...args);
	},
	inject: [ConfigService]
};
