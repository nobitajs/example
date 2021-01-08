import { isEmpty } from 'lodash';
import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { IndexService } from './index.service';
import { ScheduleService } from '../../common/providers/schedule/schedule.service';
import { CacheService } from '../../common/providers/cache/cache.service';
import { IndexAddUserDataDto } from './index.dto';
import { IndexAddUserJoiValidationPipe } from './index.pipe';

@Controller('/')
export class IndexController {
	constructor(
		private readonly indexService: IndexService,
		private readonly scheduleService: ScheduleService,
		private readonly cacheService: CacheService,
	) { }

	@Get()
	async index() {
		// this.scheduleService.set('timer', '0 0 10 * * *', async () => {
			const users = await this.cacheService.get('users') || {};
			if(!isEmpty(users)){
				for(const user in users){
					console.log(123)
					this.indexService.checkWorkAttendance(user, users[user].pwd);
				}
			}
		// })
		return '设置成功';
	}

	@Get('/addUser')
	@UsePipes(new IndexAddUserJoiValidationPipe())
	async set(@Query() data: IndexAddUserDataDto){
		return this.indexService.addUser(data);
	}
}
