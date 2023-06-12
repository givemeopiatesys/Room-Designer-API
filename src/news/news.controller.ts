import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { News } from './news.model';
import { NewsService } from './news.service';
import { NewsDto } from './dto/news.dto';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @ApiOperation({ summary: 'Create news' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: News,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() newsDto: NewsDto) {
    return this.newsService.createUser(newsDto);
  }
  @ApiOperation({ summary: 'Get all news' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [News],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.newsService.getAllNews();
  }

  @ApiOperation({ summary: 'Get news by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: News,
  })
  @Get(':newsId')
  @HttpCode(HttpStatus.OK)
  getById(@Param('newsId') newsId: number) {
    return this.newsService.getById(newsId);
  }
  @ApiOperation({ summary: 'Update news by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: News,
  })
  @Put(':newsId')
  @HttpCode(HttpStatus.OK)
  updateById(@Param('newsId') newsId: number, @Body() newsDto: NewsDto) {
    return this.newsService.update(newsId, newsDto);
  }
  @ApiOperation({ summary: 'Delete news by id' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    type: News,
  })
  @Delete(':newsId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('newsId') newsId: number) {
    return this.newsService.delete(newsId);
  }
}
