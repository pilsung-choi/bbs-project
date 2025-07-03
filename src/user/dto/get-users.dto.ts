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

  constructor(partial?: Partial<GetUserResponse>) {
    if (partial) Object.assign(this, partial);
  }

  static of(input: user | user[]): GetUserResponse | GetUserResponse[] {
    if (Array.isArray(input)) {
      return input.map((user) => new GetUserResponse(user));
    }
    return new GetUserResponse(input);
  }
}
