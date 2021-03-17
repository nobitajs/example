
import { Module } from '@nestjs/common';
import { GetListController } from './getList.controller';
import { GetListService } from './getList.service';

@Module({
  controllers: [GetListController],
  providers: [GetListService],
})
export class GetListModule {

}
