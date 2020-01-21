import { Module } from '@nestjs/common';
import { IndexModule } from './index/index.module';

@Module({
  imports: [IndexModule]
})
export class RouterModule {
}
