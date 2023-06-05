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
import { ItemsService } from './items.service';
import { Item } from './items.model';
import { ItemDto } from './dto/item.dto';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Item,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() itemDto: ItemDto) {
    return this.itemsService.createItem(itemDto);
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
  @Put(':itemId')
  @HttpCode(HttpStatus.OK)
  updateById(@Param('itemId') itemId: number, @Body() itemDto: ItemDto) {
    return this.itemsService.update(itemId, itemDto);
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
