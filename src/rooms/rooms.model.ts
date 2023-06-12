import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  AfterInsert,
  OneToMany,
  AfterLoad,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { generatePublicLink } from 'src/Ultils/publicLink';
import { Item } from 'src/items/items.model';

@Entity('rooms')
export class Room {
  @ApiProperty({ example: '1', description: 'Unique id' })
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @ApiProperty({
    example: 'Готическая комната',
    description: 'Название комнаты',
  })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({
    example: 'Душная и пыльная комната для вашего сына-подростка!',
    description: 'Описание комнаты',
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    example: './room_model_1',
    description: 'Путь к файлу модели',
  })
  // @Column({ nullable: false })
  @Column({ nullable: false })
  modelPath: string;

  @OneToMany(() => Item, (item) => item.room)
  items: Item[];

  @AfterLoad()
  setGlbLinks() {
    this.modelPath = generatePublicLink(this.modelPath);
  }
}
