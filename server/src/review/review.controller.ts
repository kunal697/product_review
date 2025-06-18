import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/createReviewDto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  getReviews(
    @Query('productId') productId?: number,
    @Query('userId') userId?: number,
  ) {
    return this.reviewService.findFiltered(productId, userId);
  }

  @Post()
  createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }
}
