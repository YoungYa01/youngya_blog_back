import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    unique: true,
    nullable: false,
    name: 'username',
    type: 'varchar',
    length: 50,
    default: 'admin',
  })
  username: string;
  @Column({
    nullable: false,
    name: 'email',
    type: 'varchar',
    length: 50,
    default: '',
  })
  email: string;
  @Column({
    nullable: false,
    name: 'password',
    type: 'varchar',
    length: 255,
    default: '$10$grUZo6efdjQJ7AzoEjBF6O.F1Y.NN5mnZS.U6xTMPOe2lrlsWhjHy',
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
  @CreateDateColumn({
    nullable: false,
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
