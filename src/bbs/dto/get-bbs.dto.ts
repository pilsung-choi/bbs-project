import { CursorPaginationDto } from '@/common/dto/cursor-page-pagination.dto';
import { RawBody } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance, Transform } from 'class-transformer';

export class GetBbsRequestDto extends CursorPaginationDto {}

export class BbsItem {
  @ApiProperty({
    description: '게시글 UUID ',
    example: 'efcf3526-b0bc-40c2-9fac-450cf311c75c',
  })
  id: string;

  @ApiProperty({
    description: '게시글 타이틀 ',
    example: '안녕하세요',
  })
  title: string;

  @ApiProperty({
    description: '게시글 내용 ',
    example: '안녕하세요 반갑습니다.',
  })
  content: string;

  @Transform(({ obj }) => obj.created_at)
  @ApiProperty({
    description: '게시글 생성날짜',
    example: '2025-07-02T20:20:12.690Z',
  })
  createdAt: Date;

  @Transform(({ obj }) => obj.updated_at)
  @ApiProperty({
    description: '게시글 수정날짜',
    example: '2025-07-02T20:20:12.690Z',
  })
  updatedAt: Date;

  @Transform(({ obj }) => obj.deleted_at)
  @ApiProperty({
    description: '게시글 삭제날짜',
    example: '2025-07-02T20:20:12.690Z',
  })
  deletedAt?: Date | null;

  @ApiProperty({
    description: '사용자 UUID ',
    example: '302863ba-9523-4ede-9147-5988f7a05d9d',
  })
  userId: string;

  @Transform(({ obj }) => ({ comments: obj._count.comments }))
  @ApiProperty({
    description: '댓글 수',
    example: { comment: 3 },
  })
  count: {
    comments: number;
  };
}

export class GetBbsResponse {
  @ApiProperty({ type: [BbsItem], description: '게시글 목록' })
  data: BbsItem[];

  @ApiProperty({
    type: String,
    nullable: true,
    description:
      '다음 페이지 커서 (id, createdAt)으로 base64 인코딩된 JSON 문자열',
    example:
      'eyJpZCI6IjE4YTY3MTdmLWM0ODgtNDNmMC04Nzc5LTczMjNjYjkzODFjMiIsImNyZWF0ZWRfYXQiOiIyMDI1LTA3LTAyVDIwOjIwOjE5LjMzNFoifQ==',
  })
  nextCursor: string | null;

  @ApiProperty({ type: Boolean, description: '다음 페이지 존재 여부' })
  hasNextPage: boolean;

  static create(
    data: any[],
    nextCursor: string | null,
    hasNextPage: boolean,
  ): GetBbsResponse {
    const response = new GetBbsResponse();
    response.data = plainToInstance(BbsItem, data);
    response.nextCursor = nextCursor;
    response.hasNextPage = hasNextPage;
    return response;
  }
}
