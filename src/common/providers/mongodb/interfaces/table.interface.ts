
import { MongoService } from '../mongodb.service';

export interface TableInterface {
	[key: string]: MongoService
};
