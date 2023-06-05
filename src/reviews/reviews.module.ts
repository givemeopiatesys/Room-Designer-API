import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsModel } from './reviews.model';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewsModel])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
