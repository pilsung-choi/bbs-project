import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BbsModule } from './bbs/bbs.module';
import { CommonModule } from './common/common.module';
import { PrismaService } from './common/prisma.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseTimeInterceptor } from './common/interceptor/response-time.interceptor';
import { PrismaExceptionFilter } from './common/filter/query-failed.filter';

@Module({
  imports: [UserModule, AuthModule, BbsModule, CommonModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTimeInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
    PrismaService,
  ],
})
export class AppModule {}
