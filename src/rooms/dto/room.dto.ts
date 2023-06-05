import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RoomDto {
  id?: number;

  @ApiProperty({
    example: './room_model_1',
    description: 'Model path',
  })
  @IsNotEmpty({ message: 'The model path cannot be empty' })
  @IsString({ message: 'The model path must be a string' })
  modelPath: string;
}
