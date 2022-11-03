import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Logger } from 'winston';
import { get, pick } from 'lodash';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost, private readonly logger: Logger) {}

  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const isHttpHttpException = exception instanceof HttpException;
    const responseBody = {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'INTERNAL SERVER ERROR',
    };

    // http error
    if (isHttpHttpException) {
      const httpStatus = exception.getStatus();
      const message = exception.message || 'UNKNOWN ERROR';
      const req: Request = ctx.getRequest();
      const user = pick(get(req, 'user'), ['id', 'username']);
      this.logger.error(`{${httpStatus}:${req.method}:${req.url}} ${user ? JSON.stringify(user) : ''} -> ${message}`, user);
      responseBody.code = httpStatus;
      responseBody.message = exception.message || 'UNKNOWN ERROR';
      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
      return;
    } else {
      // other error
      this.logger.error(exception);
      httpAdapter.reply(ctx.getResponse(), responseBody, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
