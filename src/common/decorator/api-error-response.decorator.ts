import { applyDecorators } from '@nestjs/common';
import { BaseException } from '../exception/base.exception';
import { ApiResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from '../dto/error-response.dto';

export function ApiErrorResponse(
  ExceptionClass: new (...args: any[]) => BaseException,
  ...args: any[]
) {
  const exception = new ExceptionClass(...args);
  const status = exception.getStatus();
  const { code, message } = exception.getResponse() as {
    code: number | string;
    message: string;
  };

  return applyDecorators(
    ApiResponse({
      status,
      description: exception.description || message,
      type: ErrorResponseDto,
      example: { code, message },
    }),
  );
}
