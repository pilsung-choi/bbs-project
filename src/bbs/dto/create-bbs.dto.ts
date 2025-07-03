import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBbsRequestDto {
  @ApiProperty({
    description: '게시글 제목',
    example: '게시글 제목을 입력해주세요.',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    description: '게시글 내용',
    example: '게시글의 내용을 작성해주세요.',
    maxLength: 300,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  content: string;
}

export class CreateBbsResponse {
  @ApiProperty({
    description: '게시글 ID',
    example: '302863ba-9523-4ede-9147-5988f7a05d9d',
  })
  id: string;
  @ApiProperty({
    description: '게시글 제목',
    example: '게시글 제목을 입력해주세요.',
  })
  title: string;
  @ApiProperty({
    description: '게시글 내용',
    example: '게시글의 내용을 작성해주세요.',
  })
  content: string;
  @ApiProperty({
    description: '게시글 작성 시간',
    example: '2025-06-29T20:42:48.545Z',
  })
  created_at: Date;

  constructor(partial: Partial<CreateBbsResponse>) {
    Object.assign(this, partial);
  }
}
