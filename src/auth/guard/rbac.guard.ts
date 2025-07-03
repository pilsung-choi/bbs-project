import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { RBAC } from '../decorator/rbac.decorator';
import {
  ForbiddenException,
  InvalidRoleException,
} from '@/common/exception/auth.exception';

@Injectable()
export class RBACGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolePriority = {
      USER: 1,
      ADMIN: 2,
    };

    const role = this.reflector.get<Role>(RBAC, context.getHandler());

    if (role === undefined) {
      // RBAC 데코레이터가 없는 경우(즉, Public) → 권한 체크 건너뜀
      return true;
    }

    if (!Object.values(Role).includes(role)) {
      throw new InvalidRoleException();
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (rolePriority[user.role] < rolePriority[role]) {
      throw new ForbiddenException();
    }

    return true;
  }
}
