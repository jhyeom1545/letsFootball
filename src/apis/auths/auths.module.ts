import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtAccessStrategy } from 'src/common/auth/strategy/jwtAccess.strategy';
import { JwtRefreshStrategy } from 'src/common/auth/strategy/jwtRefresh.strategy';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([User])],
  controllers: [AuthsController],
  providers: [
    AuthsService, //
    UsersService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthsModule {}
