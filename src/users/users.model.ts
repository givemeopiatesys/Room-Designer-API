import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ example: '1', description: 'Unique id' })
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @ApiProperty({ example: 'SDxszSd12', description: 'User password' })
  @Column({ nullable: false })
  password: string;

  @ApiProperty({
    example: 'shelkovichyaroslav@gmail.com',
    description: 'User email',
  })
  @Column({ unique: true, nullable: false })
  email: string;
}
