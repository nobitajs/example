import { MongoService } from '../mongodb.service';

export interface UserDeviceInterface {
	[key: string]: MongoService
};
