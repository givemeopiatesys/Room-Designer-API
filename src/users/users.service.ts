import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './users.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { hashify } from '../Ultils/helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userDto: UserDto) {
    await this.isEmailExists(userDto.email);

    const user = await this.userRepository.create(userDto);
    return await this.userRepository.save(user);
  }
  async loginUser(userDto: UserDto) {
    const email = userDto.email;
    return await this.userRepository.findOne({
      where: {
        email,
        password: hashify(userDto.password),
      },
    });
  }
  async getAllUsers() {
    const users = await this.userRepository.find();
    const data = {
      data: users,
    };
    return data;
  }
  async getById(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user) return user;
    throw new NotFoundException(`User with id = ${userId} was not found`);
  }
  async update(userId: number, userDto: UserDto) {
    const updatedUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (userDto.email !== updatedUser.email) {
      await this.isEmailExists(userDto.email);
    }
    if (updatedUser) {
      Object.assign(updatedUser, userDto);
      return await this.userRepository.save(updatedUser);
    }
  }
  async delete(userId: number) {
    const result = await this.userRepository.delete(userId);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id = ${userId} was not found`);
    }
  }
  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) return user;
  }
  async isEmailExists(email: string) {
    const user = await this.findByEmail(email);
    if (user) {
      throw new BadRequestException(
        `User with email = ${email} already exists`,
      );
    }
  }
}
