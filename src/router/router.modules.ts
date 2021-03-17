import { Module } from '@nestjs/common';
import { IndexModule } from './index/index.module';
import { GetListModule } from './getList/getList.module';

@Module({
  imports: [IndexModule, GetListModule]
})
export class RouterModule {
}
