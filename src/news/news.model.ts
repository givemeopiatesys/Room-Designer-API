import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('news')
export class News {
  @ApiProperty({ example: '1', description: 'Unique id' })
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @ApiProperty({ example: 'System update', description: 'News title' })
  @Column({ nullable: false })
  title: string;

  @ApiProperty({
    example: 'Some text',
    description: 'News body',
  })
  @Column({ unique: false, nullable: false })
  body: string;
}
