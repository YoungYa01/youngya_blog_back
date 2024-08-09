import { Test, TestingModule } from '@nestjs/testing';
import { PraiseController } from './praise.controller';
import { PraiseService } from './praise.service';

describe('PraiseController', () => {
  let controller: PraiseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PraiseController],
      providers: [PraiseService],
    }).compile();

    controller = module.get<PraiseController>(PraiseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
