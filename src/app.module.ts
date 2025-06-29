import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BbsModule } from './bbs/bbs.module';
import { CommonModule } from './common/common.module';
import { PrismaService } from './common/prisma.service';

@Module({
  imports: [UserModule, AuthModule, BbsModule, CommonModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
