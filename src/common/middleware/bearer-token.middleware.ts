import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { envVariableKeys } from '../const/env.const';
import { ConfigService } from '@nestjs/config';

declare global {
  namespace Express {
    export interface Request {
      user?: any;
    }
  }
}
@Injectable()
export class BearerTokenMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    // Bearer 토큰이 필요 없는 API 통과
    if (!authHeader) {
      return next();
    }

    const token = this.validateBearerToken(authHeader);

    const decodedPayload = await this.jwtService.decode(token);

    if (decodedPayload.type !== 'refresh' && decodedPayload.type !== 'access') {
      throw new UnauthorizedException('잘못된 토큰입니다.');
    }

    const secretKey =
      decodedPayload.type === 'refresh'
        ? envVariableKeys.refreshTokenSecret
        : envVariableKeys.accessTokenSecret;

    const payload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>(secretKey)!,
    });

    console.log('payload', payload);
    req.user = payload;

    next();
  }

  validateBearerToken(rawToken: string) {
    const bearerSplit = rawToken.split(' ');

    if (bearerSplit.length !== 2) {
      throw new BadRequestException('토큰 포멧이 잘못됐습니다.');
    }

    const [bearer, token] = bearerSplit;

    if (bearer.toLocaleLowerCase() !== 'bearer') {
      throw new BadRequestException('토큰 포멧이 잘못됐습니다.');
    }
    return token;
  }
}
