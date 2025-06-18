import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entity/review.entity';
import { CreateReviewDto } from './dto/createReviewDto';
import { User } from '../user/entity/user.entity';
import { Product } from '../product/entity/product.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async findFiltered(productId?: number, userId?: number) {
    const query = this.reviewRepo.createQueryBuilder('review')
      .leftJoinAndSelect('review.user', 'user')
      .leftJoinAndSelect('review.product', 'product');

    if (productId) query.andWhere('review.productId = :productId', { productId });
    if (userId) query.andWhere('review.userId = :userId', { userId });

    return query.getMany();
  }

  async create(dto: CreateReviewDto) {
    const { userId, productId, rating, comment, photo } = dto;

    const user = await this.userRepo.findOneBy({ id: userId });
    const product = await this.productRepo.findOneBy({ id: productId });

    if (!user || !product) {
      throw new BadRequestException('Invalid user or product ID');
    }

    const existing = await this.reviewRepo.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });

    if (existing) {
      throw new BadRequestException('User already reviewed this product');
    }

    const review = this.reviewRepo.create({
      rating,
      comment,
      photo,
      user,
      product,
    });

    return this.reviewRepo.save(review);
  }
}
