import { Test, TestingModule } from '@nestjs/testing';
import { BbsService } from './bbs.service';

describe('BbsService', () => {
  let service: BbsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BbsService],
    }).compile();

    service = module.get<BbsService>(BbsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
