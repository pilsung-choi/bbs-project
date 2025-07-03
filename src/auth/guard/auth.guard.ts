import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Public } from '../decorator/public.decotator';
import { InvalidTokenException } from '@/common/exception/auth.exception';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    // 만약에 public 데코레이터가 붙어있다면 모든 로직을 bypass

    const isPublic = this.reflector.get(Public, context.getHandler());

    if (isPublic) {
      return true;
    }

    // 요청에서 user 객체가 존재하는지 확인
    const request = context.switchToHttp().getRequest();
    if (!request.user || request.user.type !== 'access') {
      // console.log('refresh면 여기서 걸림');
      throw new InvalidTokenException(
        'request.user가 없거나 access가 아닙니다.',
      );
    }

    return true;
  }
}
