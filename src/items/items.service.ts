import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './items.model';
import { ItemDto } from './dto/item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {}

  async createItem(itemDto: ItemDto) {
    await this.isDescriptionExists(itemDto.description);
    const item = await this.itemRepository.create(itemDto);
    return await this.itemRepository.save(item);
  }
  async getAllItems() {
    const items = await this.itemRepository.find();
    return items;
  }
  async getById(itemId: number) {
    const item = await this.itemRepository.findOne({ where: { id: itemId } });
    if (item) return item;

    throw new NotFoundException(`Item with id = ${itemId} was not found`);
  }
  async update(itemId: number, itemDto: ItemDto) {
    const updatedItem = await this.itemRepository.findOne({
      where: { id: itemId },
    });
    if (itemDto.description !== updatedItem.description) {
      await this.isDescriptionExists(itemDto.description);
    }
    if (updatedItem) {
      Object.assign(updatedItem, itemDto);
      return await this.itemRepository.save(updatedItem);
    }
  }
  async delete(itemId: number) {
    const result = await this.itemRepository.delete(itemId);
    if (result.affected === 0) {
      throw new NotFoundException(`Item with id = ${itemId} was not found`);
    }
  }
  async findByDesc(description: string) {
    const item = await this.itemRepository.findOne({ where: { description } });
    if (item) return item;
  }
  async isDescriptionExists(description: string) {
    const item = await this.findByDesc(description);
    if (item) {
      throw new BadRequestException(
        `Item with description = ${description} already exists`,
      );
    }
  }
}
