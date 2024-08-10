import { Controller, Get, Post, Query, Req } from '@nestjs/common';
import { PraiseService } from './praise.service';
import { Public } from '../common/public.decorator';
import { Request } from 'express';
import { PaginateType } from '../utils/types';
import { Praise } from './entities/praise.entity';

@Public()
@Controller('api/flow')
export class PraiseController {
  constructor(private readonly praiseService: PraiseService) {}

  @Get('all')
  getAll(@Query() params: { page: number; pageSize: number; type: string }) {
    return this.praiseService.getAll(params);
  }

  @Post('/praise')
  praise(@Req() request: Request) {
    const ipAddress = request.ip;
    return this.praiseService.praise(ipAddress);
  }

  @Get('/praise/list')
  getPraiseList() {
    return this.praiseService.getPraiseList();
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

  // 访问列表
  @Get('/access/list')
  getAccessList() {
    return this.praiseService.getAccessList();
  }

  // 访问统计
  @Get('/access/count')
  getIpCount() {
    return this.praiseService.getAccessCountToday();
  }
}
