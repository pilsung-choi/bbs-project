import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
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
