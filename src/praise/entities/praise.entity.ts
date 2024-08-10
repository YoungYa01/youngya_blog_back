import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'praise',
})
export class Praise {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    name: 'ip',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '点赞IP',
    default: '',
  })
  IP: string;
  @Column({
    name: 'address',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '点赞IP地址',
    default: '{}',
  })
  address: string;
  @Column({
    name: 'is_praised',
    type: 'boolean',
    nullable: false,
    comment: '是否点赞',
    default: false,
  })
  isPraised: boolean;
  @Column({
    name: 'is_access',
    type: 'boolean',
    nullable: false,
    comment: '是否访问',
    default: false,
  })
  isAccess: boolean;
  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
