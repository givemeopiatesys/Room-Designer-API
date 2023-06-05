import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './items.model';
import { Room } from 'src/rooms/rooms.model';
@Module({
  providers: [ItemsService],
  controllers: [ItemsController],
  imports: [TypeOrmModule.forFeature([Item, Room])],
})
export class ItemsModule {}
