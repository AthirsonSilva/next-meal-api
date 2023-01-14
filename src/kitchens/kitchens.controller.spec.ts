import { Test, TestingModule } from '@nestjs/testing';
import { KitchensController } from './kitchens.controller';
import { KitchensService } from './kitchens.service';

describe('KitchensController', () => {
  let controller: KitchensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KitchensController],
      providers: [KitchensService],
    }).compile();

    controller = module.get<KitchensController>(KitchensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
