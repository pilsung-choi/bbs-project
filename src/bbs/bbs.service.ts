import { Injectable } from '@nestjs/common';
import { CreateBbsRequestDto, CreateBbsResponse } from './dto/create-bbs.dto';
import { UpdateBbDto } from './dto/update-bb.dto';
import { PrismaService } from '@/common/prisma.service';
import { BbsItem, GetBbsRequestDto, GetBbsResponse } from './dto/get-bbs.dto';
import { keysToSnakeCase, toSnakeCase } from '@/common/utils/camelcase-keys';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BbsService {
  constructor(
    private readonly prisma: PrismaService, // Assuming PrismaService is imported and available
  ) {}
  async create(
    createBbsDto: CreateBbsRequestDto,
    userId: string,
  ): Promise<CreateBbsResponse> {
    const newBbs = await this.prisma.bbs_post.create({
      data: {
        title: createBbsDto.title,
        content: createBbsDto.content,
        user_id: userId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        created_at: true,
      },
    });

    return new CreateBbsResponse(newBbs);
  }

  async findAll(GetBbsRequestDto: GetBbsRequestDto): Promise<GetBbsResponse> {
    const { cursor, take, order } = GetBbsRequestDto;
    // cursor는 base64로 인코딩된 JSON 문자열로, 예: "eyJ2YWx1ZSI6eyJpZCI6Mn0sIm9yZGVyIjpbImlkX0RFU0MiXX0="
    // id, createdAt은 커서에서 추출된 값

    const snakeCaseOrder = keysToSnakeCase(order);

    const orderBy = snakeCaseOrder.map((order) => {
      const [column, direction] = order.split('_');
      const snakeCaseColumn = /[A-Z]/.test(column)
        ? toSnakeCase(column)
        : column;
      return { [snakeCaseColumn]: direction.toLowerCase() };
    });

    const bbsPosts = await this.prisma.bbs_post.findMany({
      where: {
        deleted_at: null,
      },
      cursor: cursor
        ? JSON.parse(Buffer.from(cursor, 'base64').toString('utf-8'))
        : undefined,
      take: take + 1,
      skip: cursor ? 1 : 0,
      orderBy,
      include: {
        _count: {
          select: { comments: true },
        },
      },
    });

    const hasNextPage = bbsPosts.length > take;

    if (hasNextPage) bbsPosts.pop(); // Remove the last item if it exceeds the limit

    const lastPost = bbsPosts[bbsPosts.length - 1];

    const nextCursor = hasNextPage
      ? {
          id: lastPost.id,
          created_at: lastPost.created_at,
        }
      : null;

    const encodedCursor = nextCursor
      ? Buffer.from(JSON.stringify(nextCursor)).toString('base64')
      : null;

    return GetBbsResponse.create(bbsPosts, encodedCursor, hasNextPage);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} bb`;
  // }

  // update(id: number, updateBbDto: UpdateBbDto) {
  //   return `This action updates a #${id} bb`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} bb`;
  // }
}
