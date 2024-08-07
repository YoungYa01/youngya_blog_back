import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    unique: true,
    nullable: false,
    name: 'username',
    type: 'varchar',
    length: 20,
  })
  username: string;
  @Column({
    nullable: false,
    name: 'email',
    type: 'varchar',
    length: 20,
  })
  email: string;
  @Column({
    nullable: false,
    name: 'password',
    type: 'varchar',
    length: 20,
    select: false,
  })
  password: string;
  @Column({
    nullable: false,
    name: 'role',
    type: 'varchar',
    length: 20,
    default: '',
  })
  role: string;
  @Column({
    nullable: false,
    name: 'avatar',
    type: 'varchar',
    length: 255,
    default: '',
  })
  avatar: string;
  @CreateDateColumn({
    nullable: false,
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
