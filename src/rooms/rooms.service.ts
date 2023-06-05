import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './rooms.model';
import { RoomDto } from './dto/room.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
  ) {}

  async createRoom(roomDto: RoomDto) {
    await this.isModelPathExists(roomDto.modelPath);
    const room = await this.roomRepository.create(roomDto);
    return await this.roomRepository.save(room);
  }
  async getAllRooms() {
    const rooms = await this.roomRepository.find();
    return rooms;
  }
  async getById(roomId: number) {
    const room = await this.roomRepository.findOne({ where: { id: roomId } });
    if (room) return room;

    throw new NotFoundException(`Room with id = ${roomId} was not found`);
  }
  async update(roomId: number, roomDto: RoomDto) {
    const updatedRoom = await this.roomRepository.findOne({
      where: { id: roomId },
    });
    if (roomDto.modelPath !== updatedRoom.modelPath) {
      await this.isModelPathExists(roomDto.modelPath);
    }
    if (updatedRoom) {
      Object.assign(updatedRoom, roomDto);
      return await this.roomRepository.save(updatedRoom);
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
