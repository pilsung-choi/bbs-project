import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { RBAC } from '../decorator/rbac.decorator';

@Injectable()
export class RBACGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolePriority = {
      USER: 1,
      ADMIN: 2,
    };
    const role = this.reflector.get<Role>(RBAC, context.getHandler());

    if (!Object.values(Role).includes(role)) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (!user) {
      return false;
    }

    return rolePriority[user.role] >= rolePriority[role];
  }
  // if (!roles) {
  //   return true; // No roles defined, allow access
  // }

  // const request = context.switchToHttp().getRequest();
  // const user = request.user; // Assuming user is attached to the request

  // return roles.includes(user.role); // Check if user's role is in the allowed roles
}
