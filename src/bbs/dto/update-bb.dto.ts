import { PartialType } from '@nestjs/mapped-types';
import { CreateBbsRequestDto } from './create-bbs.dto';

export class UpdateBbDto extends PartialType(CreateBbsRequestDto) {}
