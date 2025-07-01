import { ConflictException, Injectable } from '@nestjs/common';
import {
  CreateUserRequestDto,
  CreateUserResponse,
} from './dto/create-user.dto';
import { PrismaService } from '@/common/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { envVariableKeys } from '@/common/const/env.const';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}
  async create(
    createUserRequestDto: CreateUserRequestDto,
  ): Promise<CreateUserResponse> {
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

    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hash,
        nickname,
      },
    });

    return CreateUserResponse.of(newUser);
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
