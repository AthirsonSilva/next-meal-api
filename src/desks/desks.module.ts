import { Module } from '@nestjs/common';
import { DesksService } from './desks.service';
import { DesksController } from './desks.controller';

@Module({
  controllers: [DesksController],
  providers: [DesksService]
})
export class DesksModule {}
