import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from '../common/public.decorator';

@Controller('api/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @Public()
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    return {
      code: HttpStatus.OK,
      data: `/public/${file.filename}`,
    };
  }
}
