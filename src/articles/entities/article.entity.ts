import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from '../../tags/entities/tag.entity';

@Entity({ name: 'articles' })
export class Article {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    name: 'title_zh',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '标题',
  })
  titleZH: string;
  @Column({
    name: 'title_en',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '标题',
  })
  titleEN: string;
  @Column({
    name: 'content',
    type: 'longtext',
    nullable: false,
    comment: '内容',
  })
  content: string;
  @Column({
    name: 'cover',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '封面',
  })
  cover: string;
  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
  @ManyToMany(() => Tag, (tag) => tag.articles)
  @JoinTable()
  tags: Tag[];
}
