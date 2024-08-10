import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.grard';
import { TagsModule } from './tags/tags.module';
import { UploadModule } from './upload/upload.module';
import { ArticlesModule } from './articles/articles.module';
import { PraiseModule } from './praise/praise.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: 'youngya.top', // 数据库ip地址
      port: 3306, // 端口
      username: 'youngya', // 登录名
      password: 'youngya.123', // 密码
      database: 'blog_sys', // 数据库名称
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 扫描本项目中.entity.ts或者.entity.js的文件
      synchronize: false, // 定义数据库表结构与实体类字段同步(这里一旦数据库少了字段就会自动加入,根据需要来使用)
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql', // 数据库类型
    //   host: 'localhost', // 数据库ip地址
    //   port: 3306, // 端口
    //   username: 'root', // 登录名
    //   password: 'root', // 密码
    //   database: 'blog_sys', // 数据库名称
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'], // 扫描本项目中.entity.ts或者.entity.js的文件
    //   synchronize: true, // 定义数据库表结构与实体类字段同步(这里一旦数据库少了字段就会自动加入,根据需要来使用)
    // }),
    AdminModule,
    AuthModule,
    TagsModule,
    UploadModule,
    ArticlesModule,
    PraiseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
