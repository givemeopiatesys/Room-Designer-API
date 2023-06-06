import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './rooms.model';
import { RoomDto } from './dto/room.dto';
import { extname } from 'path';
import { saveFile } from 'src/Ultils/file-management';
import { hashify } from 'src/Ultils/helper';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
  ) {}

  async createRoom(roomDto: RoomDto, glbFile: Express.Multer.File) {
    const uniqueFileName = `${hashify(
      `${Date.now()}${glbFile.originalname}`,
    )}${extname(glbFile.originalname)}`;

    glbFile.filename = uniqueFileName;

    saveFile(glbFile);

    const room = await this.roomRepository.create({
      ...roomDto,
      modelPath: glbFile.filename,
    });

    return await this.roomRepository.save(room);
  }
  async getAllRooms() {
    const rooms = await this.roomRepository.find({
      relations: { items: true },
    });
    return rooms;
  }
  async getById(roomId: number) {
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
      relations: { items: true },
    });
    if (room) return room;

    throw new NotFoundException(`Room with id = ${roomId} was not found`);
  }
  async update(
    roomId: number,
    roomDto: RoomDto,
    glbFile?: Express.Multer.File,
  ) {
    const updatedRoom = await this.roomRepository.findOne({
      where: { id: roomId },
    });

    let newGlbFileLink;

    if (glbFile) {
      if (glbFile.size > 300 * 1024 * 1024) {
        throw new HttpException(
          `Файл слишком большой по объёму!`,
          HttpStatus.CONFLICT,
        );
      }

      const fileExtension = extname(glbFile.originalname);

      if (fileExtension === '.glb') {
        throw new HttpException(
          `Неподдерживаемый формат файла! (${fileExtension})`,
          HttpStatus.CONFLICT,
        );
      }

      const uniqueFileName = hashify(
        `${glbFile.originalname}${Date.now().toString()}`,
      );

      glbFile.filename = `${uniqueFileName}${extname(glbFile.originalname)}`;

      saveFile(glbFile);

      newGlbFileLink = glbFile.filename;
    }

    if (updatedRoom) {
      Object.assign(updatedRoom, roomDto);
      return await this.roomRepository.save({
        ...updatedRoom,
        ...(newGlbFileLink ? newGlbFileLink : {}),
      });
    }
  }

  async delete(roomId: number) {
    const result = await this.roomRepository.delete(roomId);
    if (result.affected === 0) {
      throw new NotFoundException(`Room with id = ${roomId} was not found`);
    }
  }

  async findByModelPath(modelPath: string) {
    const room = await this.roomRepository.findOne({ where: { modelPath } });
    if (room) return room;
  }

  async isModelPathExists(modelPath: string) {
    const user = await this.findByModelPath(modelPath);
    if (user) {
      throw new BadRequestException(
        `Room with model path = ${modelPath} already exists`,
      );
    }
  }
}
