import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BbsModule } from './bbs/bbs.module';
import { CommonModule } from './common/common.module';
import { PrismaService } from './common/prisma.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseTimeInterceptor } from './common/interceptor/response-time.interceptor';
import { PrismaExceptionFilter } from './common/filter/query-failed.filter';
import { GlobalExceptionFilter } from './common/filter/global-exception.filter';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? 'test.env' : '.env',
      validationSchema: Joi.object({
        ENV: Joi.string().valid('test', 'dev', 'prod').required(),
        DATABASE_URL: Joi.string().required(),
        HASH_ROUNDS: Joi.number().required(),
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
      }),
    }),
    UserModule,
    AuthModule,
    BbsModule,
    CommonModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTimeInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
    PrismaService,
  ],
})
export class AppModule {}
