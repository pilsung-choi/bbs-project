import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BbsService } from './bbs.service';
import { CreateBbsRequestDto, CreateBbsResponse } from './dto/create-bbs.dto';
import { UpdateBbDto } from './dto/update-bb.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RBAC } from '@/auth/decorator/rbac.decorator';
import { CurrentUserId } from '@/user/decorator/current-user-id.decorator';
import { Public } from '@/auth/decorator/public.decotator';
import { GetBbsRequestDto, GetBbsResponse } from './dto/get-bbs.dto';
@ApiTags('bbs')
@ApiBearerAuth()
@Controller('bbs')
export class BbsController {
  constructor(private readonly bbsService: BbsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: '게시글 작성 API',
    description: '게시글을 생성 합니다. 회원이여야 합니다.',
  })
  @ApiOkResponse({
    description: '생성된 게시글의 정보',
    type: CreateBbsResponse,
  })
  create(
    @Body() createBbsDto: CreateBbsRequestDto,
    @CurrentUserId() userId: string,
  ): Promise<CreateBbsResponse> {
    return this.bbsService.create(createBbsDto, userId);
  }

  @Public()
  @Get()
  @ApiOperation({
    summary: '게시글 조회 API',
    description: '게시글을 조회 합니다. 모든 사용자가 접근 가능합니다.',
  })
  @ApiOkResponse({
    description: '게시글 조회 (페이지네이션) 댓글은 볼 수 없음',
    type: GetBbsResponse,
  })
  findAll(@Query() query: GetBbsRequestDto): Promise<GetBbsResponse> {
    return this.bbsService.findAll(query);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.bbsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBbDto: UpdateBbDto) {
  //   return this.bbsService.update(+id, updateBbDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.bbsService.remove(+id);
  // }
}
