import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewsModel } from './reviews.model';
import { Repository } from 'typeorm';
import { AddReviewDto } from './dto/add-review.dto';
import { hashify } from 'src/Ultils/helper';
import { extname } from 'path';
import { saveFile } from 'src/Ultils/file-management';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewsModel)
    private readonly reviewsRepository: Repository<ReviewsModel>,
  ) {}

  async get() {
    return await this.reviewsRepository.find({
      order: { id: 'DESC' },
      take: 5,
    });
  }

  async add(
    { name, occupation, testimony }: AddReviewDto,
    imageFile: Express.Multer.File,
  ) {
    const uniqueFileName = `${hashify(
      `${Date.now()}${imageFile.originalname}`,
    )}${extname(imageFile.originalname)}`;

    imageFile.filename = uniqueFileName;

    saveFile(imageFile);

    const newReview = await this.reviewsRepository.create({
      name,
      occupation,
      testimony,
      imageLink: imageFile.filename,
    });

    await this.reviewsRepository.save(newReview);

    return await this.reviewsRepository.findOne({
      where: { id: newReview.id },
    });
  }

  async delete(reviewId: number) {}
}
