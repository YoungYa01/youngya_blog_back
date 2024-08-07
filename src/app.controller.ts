import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  welcome(): string {
    return this.appService.welcome();
  }
}
