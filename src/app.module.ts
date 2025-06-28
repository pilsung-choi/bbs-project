import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BbsModule } from './bbs/bbs.module';

@Module({
  imports: [UserModule, AuthModule, BbsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
