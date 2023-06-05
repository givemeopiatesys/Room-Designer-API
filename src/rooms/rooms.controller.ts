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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { Room } from './rooms.model';
import { RoomDto } from './dto/room.dto';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}
  @ApiOperation({ summary: 'Create room' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Room,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() roomDto: RoomDto) {
    return this.roomsService.createRoom(roomDto);
  }
  @ApiOperation({ summary: 'Get all rooms' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [Room],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.roomsService.getAllRooms();
  }

  @ApiOperation({ summary: 'Get room by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Room,
  })
  @Get(':roomId')
  @HttpCode(HttpStatus.OK)
  getById(@Param('roomId') roomId: number) {
    return this.roomsService.getById(roomId);
  }
  @ApiOperation({ summary: 'Update room by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Room,
  })
  @Put(':roomId')
  @HttpCode(HttpStatus.OK)
  updateById(@Param('roomId') roomId: number, @Body() roomDto: RoomDto) {
    return this.roomsService.update(roomId, roomDto);
  }
  @ApiOperation({ summary: 'Delete room by id' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    type: Room,
  })
  @Delete(':roomId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('roomId') roomId: number) {
    return this.roomsService.delete(roomId);
  }
}
