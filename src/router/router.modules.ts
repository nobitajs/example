import { Module } from '@nestjs/common';
import { IndexModule } from './index/index.module';
import { GrabModule } from './grab/grab.module';
import { UpdateCityModule } from './updateCity/updateCity.module';

@Module({
  imports: [IndexModule, GrabModule, UpdateCityModule]
})
export class RouterModule {
}
