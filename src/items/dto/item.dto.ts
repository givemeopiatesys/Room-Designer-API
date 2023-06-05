import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ItemDto {
  id?: number;

  @ApiProperty({
    example: 'Chair',
    description: 'Type of item',
  })
  @IsNotEmpty({ message: 'The tile cannot be empty' })
  @IsString({ message: 'The title must be a string' })
  title: string;

  @ApiProperty({
    example: 'Nordic blush, lorem ipsum..',
    description: 'Item description',
  })
  @IsNotEmpty({ message: 'The description cannot be empty' })
  @IsString({ message: 'The description must be a string' })
  description: string;

  @ApiProperty({
    example: '["Red","Black"]',
    description: 'Item description',
  })
  @IsNotEmpty({ message: 'The colors cannot be empty' })
  @IsString({ message: 'The colors must be a string' })
  @IsArray({ message: 'The colors must be a array' })
  colors: string[];
}