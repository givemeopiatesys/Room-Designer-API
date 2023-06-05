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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: User,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() userDto: UserDto) {
    return this.usersService.createUser(userDto);
  }
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [User],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: User,
  })
  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  getById(@Param('userId') userId: number) {
    return this.usersService.getById(userId);
  }
  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: User,
  })
  @Put(':userId')
  @HttpCode(HttpStatus.OK)
  updateById(@Param('userId') userId: number, @Body() userDto: UserDto) {
    return this.usersService.update(userId, userDto);
  }
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    type: User,
  })
  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('userId') userId: number) {
    return this.usersService.delete(userId);
  }
}
