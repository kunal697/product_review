import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Product } from '../../product/entity/product.entity';

@Entity()
@Unique(['user', 'product']) // Prevent duplicate reviews by same user for same product
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ nullable: true })
  photo: string;

  @ManyToOne(() => User, (user) => user.reviews, { eager: true })
  user: User;

  @ManyToOne(() => Product, (product) => product.reviews, { eager: true })
  product: Product;
}
