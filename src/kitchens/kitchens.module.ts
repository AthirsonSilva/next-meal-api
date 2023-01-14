import { Module } from '@nestjs/common';
import { KitchensService } from './kitchens.service';
import { KitchensController } from './kitchens.controller';

@Module({
  controllers: [KitchensController],
  providers: [KitchensService]
})
export class KitchensModule {}
