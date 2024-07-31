import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as session from 'express-session';
import { VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';
import { ResponseInterceptor } from './response-data/response-data.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(
    session({
      secret: '__youngya_blog__',
      name: 'youngya.session',
      rolling: true,
      cookie: { maxAge: null },
    }),
  );
  // 全局响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());
  // 全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
