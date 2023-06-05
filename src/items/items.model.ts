import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('items')
export class Item {
  @ApiProperty({ example: '1', description: 'Unique id' })
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @ApiProperty({ example: 'Chair', description: 'What the type of item' })
  @Column({ nullable: false })
  title: string;

  @ApiProperty({ example: 'Nordic blush, lorem ipsum..', description: 'Item description', })
  @Column({ unique: true, nullable: false })
  description: string;

  @ApiProperty({ example: '[red,blue,orange]', description: 'Colors which can be item', })
  @Column(`text`,{  array: true })
  colors: string[];
}
