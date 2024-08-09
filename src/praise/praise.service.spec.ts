import { Test, TestingModule } from '@nestjs/testing';
import { PraiseService } from './praise.service';

describe('PraiseService', () => {
  let service: PraiseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PraiseService],
    }).compile();

    service = module.get<PraiseService>(PraiseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
