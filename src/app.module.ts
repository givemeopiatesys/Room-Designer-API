import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { User } from './users/users.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsModule } from './rooms/rooms.module';
import { ItemsModule } from './items/items.module';
import { Room } from './rooms/rooms.model';
import { Item } from './items/items.model';
import { AuthModule } from './auth/auth.module';
import { ReviewsModule } from './reviews/reviews.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.dev.env`,
    }),
    TypeOrmModule.forRoot({
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Room, Item],
      synchronize: true,
      type: 'postgres',
      autoLoadEntities: true,
    }),
    UsersModule,
    RoomsModule,
    ItemsModule,
    ReviewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
