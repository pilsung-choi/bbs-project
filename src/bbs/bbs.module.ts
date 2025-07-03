import { Module } from '@nestjs/common';
import { BbsService } from './bbs.service';
import { BbsController } from './bbs.controller';
import { PrismaService } from '@/common/prisma.service';
import { CommonModule } from '@/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [BbsController],
  providers: [BbsService],
})
export class BbsModule {}
