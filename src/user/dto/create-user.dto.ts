import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { PrismaClient, Role, user } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({
    description: '사용자 이메일',
    example: 'test@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsValidPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: '사용자 닉네임',
    example: '프로도',
  })
  @IsString()
  @IsNotEmpty()
  nickname: string;
}

export function IsValidPassword() {
  return applyDecorators(
    ApiProperty({
      description: '사용자 비밀번호',
      example: '!bbs1234',
      minLength: 8,
      maxLength: 16,
    }),
    IsNotEmpty({ message: '비밀번호는 필수입니다.' }),
    MinLength(8, { message: '비밀번호는 8자 이상이여야 합니다.' }),
    MaxLength(20, { message: '비밀번호는 최대 20자 입니다.' }),
  );
}

export class CreateUserResponse {
  @ApiProperty({
    description: '사용자 UUID ',
    example: '302863ba-9523-4ede-9147-5988f7a05d9d',
  })
  id: string;

  @ApiProperty({
    description: '사용자 이메일',
    example: 'test@gmail.com',
    maxLength: 16,
    minLength: 8,
  })
  email: string;

  @ApiProperty({
    description: '사용자 권한',
    example: Role.USER,
    enum: Object.values(Role),
  })
  role: Role;

  @ApiProperty({
    description: '사용자 닉네임 ',
    example: '포르도',
  })
  nickname: string;

  @ApiProperty({
    description: '계정 생성 시간',
    example: '2025-06-29T20:42:48.545Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '계정 수정 시간',
    example: '2025-06-29T20:42:48.545Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: '계정 삭제 시간',
    example: '2025-06-29T20:42:48.545Z',
  })
  deletedAt?: Date | null;

  static of(user: user): CreateUserResponse {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      nickname: user.nickname,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      deletedAt: user.deleted_at ?? null,
    };
  }
}
