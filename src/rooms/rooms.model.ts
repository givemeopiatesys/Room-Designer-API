import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('rooms')
export class Room {
  @ApiProperty({ example: '1', description: 'Unique id' })
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @ApiProperty({ example: './room_model_1', description: 'Model path' })
  @Column({ nullable: false })
  modelPath: string;
}
