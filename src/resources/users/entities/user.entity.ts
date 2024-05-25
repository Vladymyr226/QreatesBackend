import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { UserRole, UserStatus } from '../../../constants/user';
import { Label } from '../../labels/entities/label.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('users')
@Unique(['email', 'username', 'token'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 32 })
  name: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 32, unique: true, nullable: true })
  username: string;

  @Column({ type: 'varchar', length: 256 })
  password: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  resetPasswordToken: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.FIRST_LOGIN,
  })
  status: UserStatus;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateOfCreation: Date;

  @Column({ type: 'varchar', length: 256, unique: true, nullable: true })
  token?: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  companyName: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  brandName: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  webSite: string;

  @OneToMany(() => Label, (label) => label.user)
  labels: Label[];

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @Column({ type: 'int', default: 0, nullable: false })
  credits: number;
}
