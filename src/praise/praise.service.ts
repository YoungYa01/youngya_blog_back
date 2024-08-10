import { HttpStatus, Injectable } from '@nestjs/common';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { Praise } from './entities/praise.entity';
import IP2Region from 'ip2region';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateType } from '../utils/types';

@Injectable()
export class PraiseService {
  constructor(
    @InjectRepository(Praise)
    private readonly praiseRepository: Repository<Praise>,
  ) {}

  async getAll({
    page = 1,
    pageSize = 10,
    type = '',
  }: {
    page: number;
    pageSize: number;
    type: string;
  }) {
    const query =
      type === ''
        ? {
            skip: (page - 1) * pageSize,
            take: pageSize,
            order: {
              createdAt: 'DESC',
            },
          }
        : {
            where: {
              [type]: true,
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
            order: {
              createdAt: 'DESC',
            },
          };
    const data = await this.praiseRepository.find(
      query as FindManyOptions<Praise>,
    );
    const countQuery = type === '' ? {} : { [type]: true };
    const total = await this.praiseRepository.count({
      where: countQuery,
    });
    return {
      code: HttpStatus.OK,
      data: data.map((item) => ({
        ...item,
        address: JSON.parse(item.address),
        ...JSON.parse(item.address),
      })),
      total,
      page: page,
      pageSize: pageSize,
      message: '获取点赞数成功',
    };
  }

  // 点赞
  async praise(ip) {
    const createPraiseDto = new Praise();
    createPraiseDto.IP = ip;
    createPraiseDto.createdAt = new Date();
    createPraiseDto.isPraised = true;
    const ip2region = new IP2Region({
      disableIpv6: true,
    });
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

  // 获取点赞列表
  async getPraiseList() {
    const data = await this.praiseRepository.find({
      where: {
        isPraised: true,
      },
    });
    return {
      code: HttpStatus.OK,
      data,
      message: '获取点赞列表成功',
    };
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
    praise.createdAt = new Date();
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

  async getAccessList() {
    const data = await this.praiseRepository.find({
      where: {
        isAccess: true,
      },
    });
    return {
      code: HttpStatus.OK,
      data,
      message: '获取访问列表成功',
    };
  }

  async getAccessCountToday() {
    // 获取今日零时时间到今日23:59:59的时间戳
    // const startTime = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
    // const endTime = new Date(new Date().setHours(23, 59, 59, 999)).getTime();
    return {
      code: HttpStatus.OK,
      data: await this.praiseRepository.count({
        where: {
          isAccess: true,
          // createdAt: Between(new Date(startTime), new Date(endTime)),
        },
      }),
      message: '获取今日访问数成功',
    };
  }
}
