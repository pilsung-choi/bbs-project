import { Test, TestingModule } from '@nestjs/testing';
import { BbsController } from './bbs.controller';
import { BbsService } from './bbs.service';

describe('BbsController', () => {
  let controller: BbsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BbsController],
      providers: [BbsService],
    }).compile();

    controller = module.get<BbsController>(BbsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
