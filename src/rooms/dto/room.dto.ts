import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RoomDto {
  id?: number;

  @ApiProperty({
    example: 'агата',
    description: 'имя комнаты',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @ApiProperty({
    example: 'крутая комната',
    description: 'описание комнаты',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class RoomDtoUpdate {
  @IsOptional()
  id?: number;

  @IsOptional()
  @ApiProperty({
    example: 'агата',
    description: 'имя комнаты',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsOptional()
  @ApiProperty({
    example: 'крутая комната',
    description: 'описание комнаты',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
