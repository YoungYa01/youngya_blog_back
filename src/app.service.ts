import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  welcome(): string {
    return '欢迎访问YoungYa的博客后台，请从前端访问 http://youngya.top';
  }
}
