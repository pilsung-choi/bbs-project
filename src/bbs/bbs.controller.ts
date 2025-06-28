import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BbsService } from './bbs.service';
import { CreateBbDto } from './dto/create-bb.dto';
import { UpdateBbDto } from './dto/update-bb.dto';

@Controller('bbs')
export class BbsController {
  constructor(private readonly bbsService: BbsService) {}

  @Post()
  create(@Body() createBbDto: CreateBbDto) {
    return this.bbsService.create(createBbDto);
  }

  @Get()
  findAll() {
    return this.bbsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bbsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBbDto: UpdateBbDto) {
    return this.bbsService.update(+id, updateBbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bbsService.remove(+id);
  }
}
