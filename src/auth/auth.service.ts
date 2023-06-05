import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.model';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  async registerUser(userDto: RegisterUserDto): Promise<User | undefined> {
    return await this.usersService.createUser(userDto);
  }

  async loginUser(userDto: LoginUserDto) {
    const userToLogin = await this.usersService.loginUser(userDto);
    if (userToLogin) {
      const payload = {
        id: userToLogin.id,
        email: userToLogin.email,
      };

      return {
        accessToken: this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET,
        }),
      };
    } else {
      throw new HttpException(
        `Нет такого пользователя! :: ${userDto.email}`,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
