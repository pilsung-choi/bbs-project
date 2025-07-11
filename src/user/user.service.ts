import { ConflictException, Injectable } from '@nestjs/common';
import {
  CreateUserRequestDto,
  CreateUserResponse,
} from './dto/create-user.dto';
import { PrismaService } from '@/common/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { envVariableKeys } from '@/common/const/env.const';
import { GetUserResponse } from './dto/get-users.dto';
import { UserNotFoundException } from '@/common/exception/user.exceptions';

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

    const exitsUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { nickname }],
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

    return {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      nickname: newUser.nickname,
      createdAt: newUser.created_at,
      updatedAt: newUser.updated_at,
    };
    // return CreateUserResponse.of(newUser);
  }

  async findAll(): Promise<GetUserResponse[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => new GetUserResponse(user));
  }

  async findMe(userId: string): Promise<GetUserResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new UserNotFoundException('존재하지 않은 사용자입니다.');
    }

    return new GetUserResponse(user);
  }

  update(id: number, updateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
