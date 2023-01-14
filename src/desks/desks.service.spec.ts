import { Test, TestingModule } from '@nestjs/testing';
import { DesksService } from './desks.service';

describe('DesksService', () => {
  let service: DesksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesksService],
    }).compile();

    service = module.get<DesksService>(DesksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
