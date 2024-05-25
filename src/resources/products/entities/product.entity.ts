import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ProductState } from '../../../constants/product';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ProductState,
    default: ProductState.PENDING,
  })
  state: ProductState;

  @IsArray()
  @Column({
    type: 'json',
    nullable: true,
  })
  images: { imageUrl: string }[];

  @IsArray()
  @Column({
    type: 'json',
    nullable: true,
  })
  labelImages: { labelImageUrl: string }[];

  @Column({
    type: 'varchar',
    length: 256,
    default: 'Product',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({
    type: 'varchar',
    length: 256,
    default: '',
    nullable: true,
  })
  model: string;

  @Column({
    type: 'varchar',
    length: 256,
    default: '',
    nullable: true,
  })
  embedding: string;

  @Column({
    type: 'float',
    default: 0.2,
    nullable: false,
  })
  delta: number;

  @Column({
    type: 'float',
    default: 0.0,
    nullable: false,
  })
  bias: number;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  loraPath: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  loraTriggerWord: string;

  @ManyToMany(() => User)
  @JoinTable()
  user: User[];
}
