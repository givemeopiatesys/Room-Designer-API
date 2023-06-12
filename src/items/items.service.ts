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
import { extname } from 'path';
import { saveFile } from 'src/Ultils/file-management';
import { hashify } from 'src/Ultils/helper';
import { matchAtLeastOne } from 'src/Ultils/matchAtLeastOne';
import { testAtLeastOne } from 'src/Ultils/test-at-least-one';

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

  async createItem(
    itemDto: ItemDto,
    imageFile: Express.Multer.File[],
    glbFile: Express.Multer.File[],
  ) {
    const uniqueImageFileName = `${hashify(
      `${Date.now()}${imageFile[0].originalname}`,
    )}${extname(imageFile[0].originalname)}`;
    const uniqueGlbFileName = `${hashify(
      `${Date.now()}${glbFile[0].originalname}`,
    )}${extname(glbFile[0].originalname)}`;
    glbFile[0].filename = uniqueGlbFileName;
    imageFile[0].filename = uniqueImageFileName;
    saveFile(imageFile[0]);
    saveFile(glbFile[0]);
    const item = await this.itemRepository.create(itemDto);

    const preColors =
      typeof itemDto.colors === 'string' ? [itemDto.colors] : itemDto.colors;

    return await this.itemRepository.save({
      ...item,
      colors: preColors,
      imagePath: imageFile[0].filename,
      modelPath: glbFile[0].filename,
    });
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
  async update(
    itemId: number,
    itemDto: ItemDto,
    imageFile: Express.Multer.File,
  ) {
    const updatedItem = await this.itemRepository.findOne({
      where: { id: itemId },
    });

    let newFilePath = '';

    if (imageFile) {
      if (imageFile.size > 15 * 1024 * 1024) {
        throw new HttpException(
          `Файл слишком большой по объёму!`,
          HttpStatus.CONFLICT,
        );
      }

      const fileExtension = extname(imageFile.originalname);

      if (
        !testAtLeastOne(fileExtension, [
          '.gif',
          '.png',
          '.jpeg',
          '.jpg',
          '.webp',
        ])
      ) {
        throw new HttpException(
          `Неподдерживаемый формат файла! (${fileExtension})`,
          HttpStatus.CONFLICT,
        );
      }

      const uniqueFileName = hashify(
        `${imageFile.originalname}${Date.now().toString()}`,
      );

      imageFile.filename = `${uniqueFileName}${extname(
        imageFile.originalname,
      )}`;

      saveFile(imageFile);

      newFilePath = imageFile.filename;
    }

    if (updatedItem) {
      Object.assign(updatedItem, itemDto);
      return await this.itemRepository.save({
        ...updatedItem,
        ...(newFilePath ? { imagePath: newFilePath } : {}),
      });
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
