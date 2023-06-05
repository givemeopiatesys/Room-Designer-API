import { ApiProperty } from '@nestjs/swagger';
import { generatePublicLink } from 'src/Ultils/publicLink';
import { AfterLoad, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reviews')
export class ReviewsModel {
  @ApiProperty({ example: '1', description: 'Unique id' })
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @ApiProperty({
    example: 'Анфиса Бобченко',
    description: 'Имя оставившего отзыв',
  })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({
    example: 'Оператор цеха на хлебзаводе',
    description: 'Описание деятельности',
  })
  @Column({ nullable: true })
  occupation: string;

  @ApiProperty({
    example: 'Хороший стульчик для арт-деко.',
    description: 'Непосредственно отзыв',
  })
  @Column({ nullable: false })
  testimony: string;

  @ApiProperty({
    example: 'http://x.x.x.x:xxxx:/public/xxxx.jpeg',
    description: 'Ссылка на картинку оставившего отзыв',
  })
  @Column({ nullable: true })
  imageLink: string;

  @AfterLoad()
  setImageLinks() {
    this.imageLink = generatePublicLink(this.imageLink);
  }
}
