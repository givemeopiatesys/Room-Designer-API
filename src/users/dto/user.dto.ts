import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  id?: number;

  @ApiProperty({
    example: 'shelkovichyaroslav@gmail.com',
    description: 'Unique email of the user',
  })
  @IsNotEmpty({ message: 'The user email cannot be empty' })
  @IsString({ message: 'The user email must be a string' })
  email: string;

  @ApiProperty({ example: 'HsdZdj12S', description: 'Password user' })
  @IsNotEmpty({ message: 'The user password cannot be empty' })
  @IsString({ message: 'The user password must be a string' })
  password?: string;
}
