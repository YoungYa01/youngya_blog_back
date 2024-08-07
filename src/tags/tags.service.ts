import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Like, Repository } from 'typeorm';
import { PaginateType } from '../utils/types';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  /**
   * 创建标签
   * @param createTagDto
   */
  async create(createTagDto: CreateTagDto) {
    if (!createTagDto.name || !createTagDto.color) {
      return {
        code: HttpStatus.BAD_REQUEST,
        msg: '参数错误',
      };
    }
    const data = await this.tagRepository.find({
      where: {
        name: createTagDto.name,
      },
    });
    // 如果不存在
    if (data && !data.length) {
      this.tagRepository.save(createTagDto);
      return {
        code: HttpStatus.OK,
        msg: 'success',
      };
    } else {
      return {
        code: HttpStatus.BAD_REQUEST,
        msg: '已经存在该标签',
      };
    }
  }

  /**
   * 查询所有标签
   */
  async findAll(
    { page = 1, pageSize = 10 }: PaginateType,
    createTagDto: CreateTagDto | undefined,
  ) {
    let data;
    const total = await this.tagRepository.count();
    if (createTagDto) {
      Object.keys(createTagDto).map(
        (key) => (createTagDto[key] = Like(`%${createTagDto[key]}%`)),
      );
      data = await this.tagRepository.find({
        where: createTagDto,
        skip: (page - 1) * pageSize,
        take: pageSize,
        cache: true,
      });
    } else {
      data = await this.tagRepository.find({
        skip: (page - 1) * pageSize,
        take: pageSize,
        cache: true,
      });
    }
    return {
      code: HttpStatus.OK,
      msg: 'success',
      data,
      total,
      page: +page,
      pageSize: +pageSize,
    };
  }

  /**
   * 查询单个标签
   * @param id
   */
  async findOne(id: number) {
    const data = await this.tagRepository.findOneBy({
      id,
    });
    return {
      code: HttpStatus.OK,
      msg: 'success',
      data,
    };
  }

  /**
   * 更新标签
   * @param id
   * @param updateTagDto
   */
  async update(id: number, updateTagDto: UpdateTagDto) {
    if (!updateTagDto.name || !updateTagDto.color) {
      return {
        code: HttpStatus.BAD_REQUEST,
        msg: '参数错误',
      };
    }
    const resp = await this.tagRepository.update(id, updateTagDto);
    return resp.affected === 0
      ? {
          code: HttpStatus.BAD_REQUEST,
          msg: '更新失败',
        }
      : {
          code: HttpStatus.OK,
          msg: 'success',
        };
  }

  /**
   * 删除标签
   * @param id
   */
  async remove(id: number) {
    const resp = await this.tagRepository.delete(id);
    return resp.affected === 0
      ? {
          code: HttpStatus.BAD_REQUEST,
          msg: '删除失败',
        }
      : {
          code: HttpStatus.OK,
          msg: 'success',
        };
  }
}
