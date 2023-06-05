import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddReviewDto {
  @ApiProperty({
    example: 'Хороший стул, готический.',
    description: 'Отзыв',
  })
  @IsNotEmpty()
  @IsString()
  testimony: string;

  @ApiProperty({
    example: 'Серафим',
    description: 'Имя отзывающегося',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @ApiProperty({
    example: 'Столяр 5 разряда',
    description: 'Род деятельности отзывающегося',
  })
  @IsNotEmpty()
  @IsString()
  occupation: string;
}
