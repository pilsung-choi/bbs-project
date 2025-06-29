import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Authorization } from './decorator/authorization.decoration';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Authorization() token: string) {
    return this.authService.register(token);
  }

  @Post('login')
  login(@Authorization() token: string) {
    return this.authService.login(token);
  }
}
