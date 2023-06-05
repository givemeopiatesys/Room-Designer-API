import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Inject,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReviewsService } from './reviews.service';
import { matchAtLeastOne } from 'src/Ultils/matchAtLeastOne';
import { AddReviewDto } from './dto/add-review.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('/')
  get() {
    return this.reviewsService.get();
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('imageFile'))
  add(
    @Body() body: AddReviewDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 }), // 50 MB image max
          new FileTypeValidator({
            fileType: matchAtLeastOne([
              'image/jpeg',
              'image/png',
              'image/webp',
              'image/gif',
            ]),
          }),
        ],
      }),
    )
    imageFile: Express.Multer.File,
  ) {
    return this.reviewsService.add(body, imageFile);
  }

  @Delete('/:reviewId')
  delete(@Param('reviewId') reviewId: number) {
    return this.reviewsService.delete(reviewId);
  }
}
