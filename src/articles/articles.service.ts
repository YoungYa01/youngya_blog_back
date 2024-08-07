import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { In, Like, Repository } from 'typeorm';
import { PaginateType } from '../utils/types';
import { Tag } from '../tags/entities/tag.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  /**
   * 创建文章
   * @param createArticleDto
   */
  async create(createArticleDto: CreateArticleDto) {
    if (
      !createArticleDto.titleZH ||
      !createArticleDto.content ||
      !createArticleDto.tagList
    ) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '标题和内容不能为空',
        data: null,
      };
    } else {
      const tags: number[] = createArticleDto.tagList;
      const tagsList = await this.tagsRepository.findBy({
        id: In(tags),
      });
      const article = new Article();
      article.titleZH = createArticleDto.titleZH;
      article.titleEN = createArticleDto.titleEN;
      article.content = createArticleDto.content;
      article.createdAt = new Date();
      article.tags = tagsList;
      const res = await this.articleRepository.save(article);
      return {
        code: HttpStatus.OK,
        message: '创建成功',
        data: res,
      };
    }
  }

  async findAll(
    { page = 1, pageSize = 10 }: PaginateType,
    createArticleDto: CreateArticleDto | undefined,
  ) {
    let data;
    const total = await this.articleRepository.count();
    if (createArticleDto) {
      Object.keys(createArticleDto).map(
        (key) => (createArticleDto[key] = Like(`%${createArticleDto[key]}%`)),
      );
      data = await this.articleRepository.find({
        relations: ['tags'],
        where: createArticleDto,
        skip: (page - 1) * pageSize,
        take: pageSize,
        cache: true,
      });
    } else {
      data = await this.articleRepository.find({
        relations: ['tags'],
        skip: (page - 1) * pageSize,
        take: pageSize,
        cache: true,
      });
    }
    return {
      code: HttpStatus.OK,
      message: 'success',
      data,
      total,
      page: +page,
      pageSize: +pageSize,
    };
  }

  async findOne(id: number) {
    const data = await this.articleRepository.findOne({
      where: { id },
      relations: ['tags'],
    });
    if (!data) {
      return {
        code: HttpStatus.NOT_FOUND,
        message: '文章不存在',
        data: null,
      };
    }
    return {
      code: HttpStatus.OK,
      message: 'success',
      data,
    };
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    if (
      !updateArticleDto.titleZH ||
      !updateArticleDto.content ||
      !updateArticleDto.tagList
    ) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '标题和内容不能为空',
        data: null,
      };
    }
    const tags = updateArticleDto.tagList;
    const tagList = await this.tagsRepository.findBy({
      id: In(tags),
    });
    const article = await this.articleRepository.findOne({
      where: { id },
    });
    article.titleZH = updateArticleDto.titleZH;
    article.titleEN = updateArticleDto.titleEN;
    article.content = updateArticleDto.content;
    article.createdAt = new Date();
    article.tags = tagList;
    const res = await this.articleRepository.save(article);
    return res
      ? {
          code: HttpStatus.OK,
          message: '更新成功',
          data: null,
        }
      : {
          code: HttpStatus.NOT_FOUND,
          message: '文章不存在',
          data: null,
        };
  }

  async remove(id: number) {
    const res = await this.articleRepository.delete(id);
    return res.affected > 0
      ? {
          code: HttpStatus.OK,
          message: '删除成功',
          data: null,
        }
      : {
          code: HttpStatus.NOT_FOUND,
          message: '文章不存在',
          data: null,
        };
  }
}
