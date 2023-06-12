import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  AfterLoad,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Room } from 'src/rooms/rooms.model';
import { generatePublicLink } from 'src/Ultils/publicLink';

@Entity('items')
export class Item {
  @ApiProperty({ example: '1', description: 'Unique id' })
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @ApiProperty({ example: 'Chair', description: 'What the type of item' })
  @Column({ nullable: false })
  title: string;

  @ApiProperty({
    example: 'Nordic blush, lorem ipsum..',
    description: 'Item description',
  })
  @Column({ unique: true, nullable: false })
  description: string;

  @ApiProperty({
    example: './room_model_1',
    description: 'Путь к файлу модели',
  })
  // @Column({ nullable: false })
  @Column({ nullable: true })
  modelPath: string;

  @ApiProperty({
    example: './jpeg',
    description: 'Путь к файлу изоброжения',
  })
  @Column({ nullable: true })
  imagePath: string;

  @ApiProperty({
    example: '[red,blue,orange]',
    description: 'Colors which can be item',
  })
  @Column('json', { nullable: true })
  colors: string[];

  @ManyToOne(() => Room, (room) => room.items)
  @JoinColumn()
  room: Room;

  @AfterLoad()
  setImageLinks() {
    this.imagePath = generatePublicLink(this.imagePath);
  }
}
