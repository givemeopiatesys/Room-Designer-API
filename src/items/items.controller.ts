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
import { ItemsService } from './items.service';
import { Item } from './items.model';
import { ItemDto, ItemDtoUpdate } from './dto/item.dto';
import { BindItemToRoomDTO } from './dto/bind.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { matchAtLeastOne } from 'src/Ultils/matchAtLeastOne';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Item,
  })
  @UseInterceptors(FileInterceptor('imageFile'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() itemDto: ItemDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 15 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType: matchAtLeastOne([
              'image/jpeg',
              'image/png',
              'image/webp',
              'image/gif',
            ]),
          }),
        ],
      }),
    )
    imageFile: Express.Multer.File,
  ) {
    return this.itemsService.createItem(itemDto, imageFile);
  }

  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [Item],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.itemsService.getAllItems();
  }

  @ApiOperation({ summary: 'Get item by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Item,
  })
  @Get(':itemId')
  @HttpCode(HttpStatus.OK)
  getById(@Param('itemId') itemId: number) {
    return this.itemsService.getById(itemId);
  }

  @ApiOperation({ summary: 'Update item by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Item,
  })
  @UseInterceptors(FileInterceptor('imageFile'))
  @Put(':itemId')
  @HttpCode(HttpStatus.OK)
  updateById(
    @Param('itemId') itemId: number,
    @Body() itemDto: ItemDtoUpdate,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    return this.itemsService.update(itemId, itemDto, imageFile);
  }

  @ApiOperation({ summary: 'Update item by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Item,
  })
  @Put('bind/:itemId')
  @HttpCode(HttpStatus.OK)
  bindToRoom(@Param('itemId') itemId: number, @Body() body: BindItemToRoomDTO) {
    return this.itemsService.bindToRoom(itemId, body.bindedRoomId);
  }

  @ApiOperation({ summary: 'Delete item by id' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    type: Item,
  })
  @Delete(':itemId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('itemId') itemId: number) {
    return this.itemsService.delete(itemId);
  }
}
