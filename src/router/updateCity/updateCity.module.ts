
import { Module } from '@nestjs/common';
import { UpdateCityController } from './updateCity.controller';
import { UpdateCityService } from './updateCity.service';

@Module({
  controllers: [UpdateCityController],
  providers: [UpdateCityService],
})
export class UpdateCityModule {

}
