import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class NewsDto {
  id?: number;

  @ApiProperty({
    example: 'Update models',
    description: 'Title',
  })
  @IsNotEmpty({ message: 'The title cannot be empty' })
  @IsString({ message: 'The title must be a string' })
  title: string;

  @ApiProperty({ example: 'Some text....', description: 'Body news' })
  @IsNotEmpty({ message: 'The body cannot be empty' })
  @IsString({ message: 'The body must be a string' })
  body?: string;
}
