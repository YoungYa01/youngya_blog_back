import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';

//文件上传需要的包
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join, extname } from 'path';


@Module({
  //里面有register 和 registerAsync 两个方法，前者是同步的，后者是异步的
  imports: [
    MulterModule.register({
      //图片上传完要存放的位置
      storage: diskStorage({
        destination: join(__dirname, '../../public'), //存放的文件路径
        filename: (req, file, callback) => {
          //重新定义文件名，file.originalname 文件的原始名称
          // extname 获取文件后缀
          const fileName = `${new Date().getTime() + extname(file.originalname)}`;
          //返回新的名称，参数1是错误，这里用null就好
          return callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
