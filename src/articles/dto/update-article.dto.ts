import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';
import { Tag } from '../../tags/entities/tag.entity';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  id: number;
  titleZH: string;
  titleEN: string;
  content: string;
  created_at: Date;
  tags: Tag[];
}
