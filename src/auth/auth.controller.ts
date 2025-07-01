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
import { loginResponseDto } from './dto/login.dto';
import { Authorization } from './decorator/authorization.decoration';
import {
  CreateUserRequestDto,
  CreateUserResponse,
} from '@/user/dto/create-user.dto';
import {
  ApiBasicAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from './decorator/public.decotator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  @ApiOperation({
    summary: '유저 생성 API',
  })
  @ApiResponse({
    status: 201,
    description: '사용자가 성공적으로 생성 됐을 때',
    type: CreateUserResponse,
  })
  register(
    @Body() createUserDto: CreateUserRequestDto,
  ): Promise<CreateUserResponse> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @Public()
  @ApiOperation({
    summary: '로그인 API',
  })
  @ApiBasicAuth()
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    type: loginResponseDto,
  })
  login(@Authorization() token: string): Promise<loginResponseDto> {
    return this.authService.login(token);
  }
}
