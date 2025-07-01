import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { RBAC } from '@/auth/decorator/rbac.decorator';
import { Role } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Authorization } from '@/auth/decorator/authorization.decoration';
import { GetUserResponse } from './dto/get-users.dto';
import { CurrentUserId } from './decorator/current-user-id.decorator';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '모든 유저 조회 API',
    description: '모든 유저를 조회합니다. 관리자 권한이 필요합니다.',
  })
  @ApiOkResponse({
    description: '모든 유저를 조회합니다.',
    type: GetUserResponse,
    isArray: true,
  })
  @RBAC(Role.ADMIN)
  findAll(): Promise<GetUserResponse[]> {
    return this.userService.findAll();
  }

  @Get('me')
  @ApiOperation({
    summary: '사용자 (본인) 정보 조회 API',
    description: '사용자 본인의 정보를 조회합니다.',
  })
  @ApiBearerAuth()
  @RBAC(Role.USER)
  findMe(@CurrentUserId() userId: string): Promise<GetUserResponse> {
    return this.userService.findMe(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
