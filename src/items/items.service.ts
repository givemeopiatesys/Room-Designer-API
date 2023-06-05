import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './items.model';
import { ItemDto } from './dto/item.dto';
import { Room } from 'src/rooms/rooms.model';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
  ) {}

  async bindToRoom(itemId: number, roomId: number) {
    const [roomCandidate, itemCandidate] = [
      await this.roomRepository.findOne({ where: { id: roomId } }),
      await this.itemRepository.findOne({ where: { id: itemId } }),
    ];

    if (roomCandidate) {
      if (!itemCandidate) {
        throw new HttpException('No item!', HttpStatus.CONFLICT);
      }

      await this.itemRepository.update(itemCandidate.id, {
        room: { id: roomCandidate.id },
      });
    } else {
      await this.itemRepository.update(itemCandidate.id, {
        room: null,
      });
    }

    return await this.itemRepository.findOne({
      where: { id: itemCandidate.id },
      relations: { room: true },
    });
  }

  async createItem(itemDto: ItemDto) {
    await this.isDescriptionExists(itemDto.description);
    const item = await this.itemRepository.create(itemDto);
    return await this.itemRepository.save({ ...item, colors: itemDto.colors });
  }

  async getAllItems() {
    const items = await this.itemRepository.find({ relations: { room: true } });
    return items;
  }

  async getById(itemId: number) {
    const item = await this.itemRepository.findOne({
      where: { id: itemId },
      relations: { room: true },
    });
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
