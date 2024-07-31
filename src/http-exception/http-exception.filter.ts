import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

// 异常拦截器，出现异常时返回异常的状态码和请求路径
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus() || 500;
    const message = exception.message;
    const url = request.url;
    response.status(status).json({
      statusCode: status,
      message,
      url,
    });
  }
}
