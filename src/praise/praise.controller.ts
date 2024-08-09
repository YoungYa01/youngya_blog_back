import { Controller, Get, Post, Req } from '@nestjs/common';
import { PraiseService } from './praise.service';
import { Public } from '../common/public.decorator';
import { Request } from 'express';

@Public()
@Controller('api/flow')
export class PraiseController {
  constructor(private readonly praiseService: PraiseService) {}

  @Post('/praise')
  praise(@Req() request: Request) {
    const ipAddress = request.ip;
    return this.praiseService.praise(ipAddress);
  }

  // 点赞统计
  @Get('/praise/count')
  getPraiseCount() {
    return this.praiseService.count();
  }

  // 访问
  @Post('/access')
  access(@Req() request: Request) {
    const ipAddress = request.ip;
    return this.praiseService.access(ipAddress);
  }

  // 访问统计
  @Get('/access/count')
  getIpCount() {
    return this.praiseService.getAccessCountToday();
  }
}
