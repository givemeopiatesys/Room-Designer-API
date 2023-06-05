import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './items.model';
@Module({
  providers: [ItemsService],
  controllers: [ItemsController],
  imports: [TypeOrmModule.forFeature([Item])],
})
export class ItemsModule {}
