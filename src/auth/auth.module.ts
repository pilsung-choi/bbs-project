import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CommonModule } from '@/common/common.module';
import { UserModule } from '@/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [CommonModule, UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
