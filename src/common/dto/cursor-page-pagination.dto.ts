import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CursorPaginationDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '페이지네이션 커서',
    example: 'eyJ2YWx1ZSI6eyJpZCI6Mn0sIm9yZGVyIjpbImlkX0RFU0MiXX0=',
    required: false,
  })
  cursor?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({
    description: '내림차 또는 오름차 정렬',
    example: ['created_at_DESC'],
    required: false,
  })
  @Transform(({ value }) => {
    // Array.isArray(value ? value : [value]);
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return [value];
    return [];
  })
  order: string[] = ['createdAt_DESC'];

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: '가져올 데이터의 개수',
    example: '2',
  })
  take: number = 2;
}
