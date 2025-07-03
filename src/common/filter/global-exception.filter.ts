import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    const { method, originalUrl } = req;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();

      if (typeof response === 'string') {
        message = response;
      } else if (typeof response === 'object' && response !== null) {
        message = (response as any).message;
      }
      // HttpException(핸들링된 에러) 로그
      this.logger.warn(
        `[${method}] ${originalUrl} ${status} - ${JSON.stringify(message)}`,
      );
    } else {
      // 핸들링되지 않은 에러 로그
      this.logger.error(
        `[${method}] ${originalUrl} ${status} - ${exception?.stack || exception}`,
      );
    }

    res.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: req.url,
      message,
    });
  }
}
