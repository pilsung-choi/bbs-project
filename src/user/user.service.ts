import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { PrismaService } from '@/common/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { env } from 'process';
import { envVariableKeys } from '@/common/const/env.const';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}
  async create(createUserRequestDto: CreateUserRequestDto) {
    const { email, password, nickname } = createUserRequestDto;

    const exitsUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (exitsUser) {
      throw new ConflictException('이미 존재하는 유저입니다.');
    }

    const hash = await bcrypt.hash(
      password,
      this.configService.get<number>(envVariableKeys.hashRounds)!,
    );

    await this.prisma.user.create({
      data: {
        email,
        password: hash,
        nickname,
      },
    });

    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
