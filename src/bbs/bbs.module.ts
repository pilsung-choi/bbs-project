import { Module } from '@nestjs/common';
import { BbsService } from './bbs.service';
import { BbsController } from './bbs.controller';

@Module({
  controllers: [BbsController],
  providers: [BbsService],
})
export class BbsModule {}
