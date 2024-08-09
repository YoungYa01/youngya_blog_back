import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdatePraiseDto } from './dto/update-praise.dto';
import {
  Between,
  Equal,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { Praise } from './entities/praise.entity';
import IP2Region from 'ip2region';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PraiseService {
  constructor(
    @InjectRepository(Praise)
    private readonly praiseRepository: Repository<Praise>,
  ) {}

  // 点赞
  async praise(ip) {
    const createPraiseDto = new Praise();
    createPraiseDto.IP = ip;
    createPraiseDto.craetedAt = new Date();
    createPraiseDto.isPraised = true;
    const ip2region = new IP2Region();
    createPraiseDto.address = JSON.stringify(ip2region.search(ip));
    const res = await this.praiseRepository.save(createPraiseDto);
    if (res) {
      return {
        code: HttpStatus.OK,
        data: await this.praiseRepository.count({
          where: {
            isPraised: true,
          },
        }),
        message: '点赞成功',
      };
    } else {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '点赞失败',
      };
    }
  }

  async count() {
    return {
      code: HttpStatus.OK,
      data: await this.praiseRepository.count({
        where: {
          isPraised: true,
        },
      }),
      message: '获取点赞数成功',
    };
  }

  async access(ip) {
    const praise = new Praise();
    praise.isAccess = true;
    praise.craetedAt = new Date();
    praise.IP = ip;
    const ip2region = new IP2Region();
    praise.address = JSON.stringify(ip2region.search(ip));
    const res = await this.praiseRepository.save(praise);
    if (res) {
      return {
        code: HttpStatus.OK,
        data: await this.praiseRepository.count({
          where: {
            isAccess: true,
          },
        }),
        message: '获取访问数成功',
      };
    } else {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '获取访问数失败',
      };
    }
  }

  async getAccessCountToday() {
    // 获取今日零时时间到今日23:59:59的时间戳
    const startTime = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
    const endTime = new Date(new Date().setHours(23, 59, 59, 999)).getTime();
    return {
      code: HttpStatus.OK,
      data: await this.praiseRepository.count({
        where: {
          isAccess: true,
          craetedAt: Between(new Date(startTime), new Date(endTime)),
        },
      }),
      message: '获取今日访问数成功',
    };
  }
}
