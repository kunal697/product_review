import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import 'dotenv/config';
import { Review } from './review/entity/review.entity';
import { Product } from './product/entity/product.entity';
import { User } from './user/entity/user.entity';

@Module({
  imports: [
    ReviewModule,
    UserModule,
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true, // Automatically loads entities (instead of manually listing them)
      synchronize: true,   
      entities: [User,Review,Product]  // Set to true only in development
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
