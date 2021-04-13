
import { Module } from '@nestjs/common';
import { GrabController } from './grab.controller';
import { GrabService } from './grab.service';

@Module({
  controllers: [GrabController],
  providers: [GrabService],
})
export class GrabModule {

}
