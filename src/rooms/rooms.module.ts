import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { Room } from './rooms.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  imports: [TypeOrmModule.forFeature([Room])],
})
export class RoomsModule {}
