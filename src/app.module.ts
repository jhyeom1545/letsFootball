import { Module } from '@nestjs/common';
import { UserModule } from './apis/users/user.module';
import { AuthModule } from './apis/auths/auths.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BoardModule } from './apis/boards/board.module';
import { LikeModule } from './apis/likes/like.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BoardModule,
    LikeModule,
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
  ],
})
export class AppModule {}
