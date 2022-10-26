import { Module } from '@nestjs/common';
import { UsersModule } from './apis/users/users.module';
import { AuthsModule } from './apis/auths/auths.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BoardsModule } from './apis/boards/boards.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [
    AuthsModule,
    UsersModule,
    BoardsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'], // 모델
      synchronize: true,
      logging: true,
      retryAttempts: 20,
    }),
    BoardsModule,
    LikesModule,
  ],
})
export class AppModule {}
