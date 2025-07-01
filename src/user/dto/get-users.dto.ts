import { ApiProperty } from '@nestjs/swagger';
import { Role, user } from '@prisma/client';

export class GetUserResponse {
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
  created_at: Date;

  @ApiProperty({
    description: '계정 수정 시간',
    example: '2025-06-29T20:42:48.545Z',
  })
  updated_at: Date;

  @ApiProperty({
    description: '계정 삭제 시간',
    example: '2025-06-29T20:42:48.545Z',
  })
  deleted_at?: Date | null;

  static of(user: user): GetUserResponse;
  static of(users: user[]): GetUserResponse[];
  static of(input: user | user[]): GetUserResponse | GetUserResponse[] {
    if (Array.isArray(input)) {
      return input.map((user) => GetUserResponse.of(user));
    }
    return {
      id: input.id,
      email: input.email,
      role: input.role,
      nickname: input.nickname,
      created_at: input.created_at,
      updated_at: input.updated_at,
      deleted_at: input.deleted_at ?? null,
    };
  }
}
