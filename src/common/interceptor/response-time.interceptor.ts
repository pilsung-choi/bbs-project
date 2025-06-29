import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const reqTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const resTime = Date.now();
        const diff = resTime - reqTime;
        const a = request;
        console.log(`[${request.method}] ${request.url} - ${diff}ms`);
      }),
      catchError((err) => {
        const resTime = Date.now();
        const diff = resTime - reqTime;
        console.log(`[${request.method}] ${request.url} - ${diff}ms (error)`);
        throw err;
      }),
    );
  }
}
