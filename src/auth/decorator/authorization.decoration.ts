import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const Authorization = createParamDecorator(
  (_: unknown, ctx: ExecutionContextHost) => {
    const request = ctx.switchToHttp().getRequest();

    return request.headers['authorization'];
  },
);
