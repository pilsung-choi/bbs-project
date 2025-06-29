import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    let message = '예상치 못한 에러';

    const { meta } = exception;

    if (exception.code === 'P2002') {
      message = `이미 존재한 값이 있습니다. prisma model ${meta?.modelName}에 ${meta?.target}`;

      res.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        timestamp: new Date().toISOString(),
        path: req.url,
        message,
      });
    }

    // res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //   statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    //   timestamp: new Date().toISOString(),
    //   path: req.url,
    //   message,
    // });
  }
}
