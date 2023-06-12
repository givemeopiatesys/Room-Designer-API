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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemsService } from './items.service';
import { Item } from './items.model';
import { ItemDto, ItemDtoUpdate } from './dto/item.dto';
import { BindItemToRoomDTO } from './dto/bind.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
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
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'imageFile', maxCount: 1 },
      { name: 'glbFile', maxCount: 1 },
    ]),
  )
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() itemDto: ItemDto,
    @UploadedFiles()
    files: { imageFile: Express.Multer.File[]; glbFile: Express.Multer.File[] },
    // imageFile: Express.Multer.File
  ) {
    return this.itemsService.createItem(
      itemDto,
      files.imageFile,
      files.glbFile,
    );
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
