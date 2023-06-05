import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { Room } from './rooms.model';
import { RoomDto } from './dto/room.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @ApiOperation({ summary: 'Create room' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Room,
  })
  @UseInterceptors(FileInterceptor('glbFile'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() roomDto: RoomDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 300 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType: 'model/gltf-binary',
          }),
        ],
      }),
    )
    glbFile: Express.Multer.File,
  ) {
    return this.roomsService.createRoom(roomDto, glbFile);
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
  @UseInterceptors(FileInterceptor('glbFile'))
  @Put(':roomId')
  @HttpCode(HttpStatus.OK)
  updateById(
    @Param('roomId') roomId: number,
    @Body() roomDto: RoomDto,
    @UploadedFile() glbFile: Express.Multer.File,
  ) {
    return this.roomsService.update(roomId, roomDto);
  }

  @ApiOperation({ summary: 'Update room by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Room,
  })
  @Put(':roomId')
  @HttpCode(HttpStatus.OK)
  updateModelById(@Param('roomId') roomId: number, @Body() roomDto: RoomDto) {
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
