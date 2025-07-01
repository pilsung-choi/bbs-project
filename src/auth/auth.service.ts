import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@/common/prisma.service';
import { CreateUserRequestDto } from '@/user/dto/create-user.dto';
import { UserService } from '@/user/user.service';
import { ConfigService } from '@nestjs/config';
import { envVariableKeys } from '@/common/const/env.const';
import { Role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { loginResponseDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}
  async register(createUserDto: CreateUserRequestDto) {
    const { email, password, nickname } = createUserDto;

    return this.userService.create({ email, password, nickname });
  }

  async login(token: string): Promise<loginResponseDto> {
    console.log('token', token);
    const { email, password } = this.parseBasicToken(token);

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
        role: true,
      },
    });

    if (!user) {
      throw new BadRequestException('잘못된 로그인 정보입니다.');
    }

    const passOk = await bcrypt.compare(password, user.password);

    if (!passOk) {
      throw new BadRequestException('잘못된 로그인 정보입니다.');
    }

    return {
      refreshToken: await this.issueToken(user, true),
      accessToken: await this.issueToken(user, false),
    };
  }

  parseBasicToken(rawToken: string) {
    const basicSplit = rawToken.split(' ');

    if (basicSplit.length !== 2) {
      new BadRequestException('토큰 포멧이 잘못됐습니다.');
    }

    const [basic, token] = basicSplit;

    if (basic.toLocaleLowerCase() !== 'basic') {
      throw new BadRequestException('토큰 포멧이 잘못됐습니다.');
    }

    const decoded = Buffer.from(token, 'base64').toString('utf-8');

    const tokenSplit = decoded.split(':');

    if (tokenSplit.length !== 2) {
      throw new BadRequestException('토큰 포멧이 잘못됐습니다.');
    }

    const [email, password] = tokenSplit;

    return {
      email,
      password,
    };
  }

  async issueToken(user: { id: string; role: Role }, isRefreshToken: boolean) {
    const refreshToken = this.configService.get<string>(
      envVariableKeys.refreshTokenSecret,
    );
    const accessToken = this.configService.get<string>(
      envVariableKeys.accessTokenSecret,
    );

    return await this.jwtService.signAsync(
      {
        sub: user.id,
        role: user.role,
        type: isRefreshToken ? 'refresh' : 'access',
      },
      {
        secret: isRefreshToken ? refreshToken : accessToken,
        expiresIn: isRefreshToken ? '24h' : '1h',
      },
    );
  }

  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
