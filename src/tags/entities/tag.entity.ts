import {
  Column,
  Entity,
  JoinColumn, ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Article } from '../../articles/entities/article.entity';

@Entity({ name: 'tags' })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
    comment: '标签名称',
    default: '',
  })
  name: string;
  @Column({
    name: 'color',
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: '标签颜色',
    default: '',
  })
  color: string;
  @Column({
    name: 'icon',
    type: 'varchar',
    length: 50,
    comment: '标签图标',
    default: '',
  })
  icon: string;
  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];
}
