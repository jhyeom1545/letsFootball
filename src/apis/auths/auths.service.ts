import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { ICurrentUser } from 'src/common/currentUser';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LoginInput } from './dto/loginInput.dto';

@Injectable()
export class AuthsService {
  constructor(
    private readonly usersService: UsersService, //
    private readonly jwtService: JwtService,
  ) {}

  async login({ loginInput, res }: { loginInput: LoginInput; res: Response }): Promise<string> {
    const { email, password } = loginInput;
    // Id 확인
    const user = await this.usersService.findOne({ email });

    // 비밀번호 확인
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new ForbiddenException('비밀번호가 틀립니다.');

    // refreshToken 발급
    this.setRefreshToken({ user, res });

    const currentUser = {
      email: user.email,
      createdAt: user.createdAt,
    };

    // accessToken 발급
    const result = await this.getAccessToken({ currentUser });
    return result;
  }

  async getAccessToken({ currentUser }: { currentUser: ICurrentUser }): Promise<string> {
    const accessKey = process.env.JWT_ACCESS_KEY;
    const expireTime = process.env.JWT_ACCESS_EXPIRATION;
    return this.jwtService.sign(
      { email: currentUser.email, createdAt: currentUser.createdAt },
      { secret: accessKey, expiresIn: expireTime },
    );
  }

  setRefreshToken({ user, res }: { user: User; res: Response }): void {
    const refreshKey = process.env.JWT_REFRESH_KEY;
    const expireTime = process.env.JWT_REFRESH_EXPIRATION;
    const refreshToken = this.jwtService.sign(
      { email: user.email, createdAt: user.createdAt },
      { secret: refreshKey, expiresIn: expireTime },
    );
    res.setHeader('Access-Control-Allow-Origin', `${process.env.ALLOW_ORIGIN_URL}`);
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; Path=/; HttpOnly`);
  }
}
