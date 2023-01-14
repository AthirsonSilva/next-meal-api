import { Test, TestingModule } from '@nestjs/testing';
import { DesksController } from './desks.controller';
import { DesksService } from './desks.service';

describe('DesksController', () => {
  let controller: DesksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesksController],
      providers: [DesksService],
    }).compile();

    controller = module.get<DesksController>(DesksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
