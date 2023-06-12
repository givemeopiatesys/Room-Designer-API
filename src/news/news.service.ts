import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsDto } from './dto/news.dto';
import { News } from './news.model';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private readonly newsRepository: Repository<News>,
  ) {}

  async createUser(newsDto: NewsDto) {
    const user = await this.newsRepository.create({
      ...newsDto,
    });
    return await this.newsRepository.save(user);
  }

  async getAllNews() {
    const news = await this.newsRepository.find();
    const data = {
      data: news,
    };
    return data;
  }

  async getById(newsId: number) {
    const news = await this.newsRepository.findOne({ where: { id: newsId } });
    if (news) return news;
    throw new NotFoundException(`News with id = ${news} was not found`);
  }

  async update(newsId: number, newsDto: NewsDto) {
    const updatedNews = await this.newsRepository.findOne({
      where: { id: newsId },
    });
    if (updatedNews) {
      Object.assign(updatedNews, newsDto);
      return await this.newsRepository.save(updatedNews);
    }
  }

  async delete(newsId: number) {
    const result = await this.newsRepository.delete(newsId);
    if (result.affected === 0) {
      throw new NotFoundException(`News with id = ${newsId} was not found`);
    }
  }
}
