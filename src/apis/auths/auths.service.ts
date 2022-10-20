import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthsService {
  constructor(
    private readonly usersService: UsersService, //
    private readonly jwtService: JwtService,
  ) {}

  async login({ loginInput, res }) {
    const { email, password } = loginInput;
    // Id 확인
    const user = await this.usersService.findOne({ email });

    // 비밀번호 확인
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new ForbiddenException('비밀번호가 틀립니다.');

    // refreshToken 넣기
    this.setRefreshToken({ user, res });
    return this.getAccessToken({ user });
  }

  getAccessToken({ user }: { user: User }): string {
    const accessKey = process.env.JWT_ACCESS_KEY;
    const expireTime = process.env.JWT_ACCESS_EXPIRATION_TIME;
    return this.jwtService.sign(
      { email: user.email, createdAt: user.createdAt },
      { secret: accessKey, expiresIn: expireTime },
    );
  }

  setRefreshToken({ user, res }) {
    const refreshKey = process.env.JWT_REFRESH_KEY;
    const expireTime = process.env.JWT_REFRESH_EXPIRATION_TIME;
    const refreshToken = this.jwtService.sign(
      { email: user.email, createdAt: user.createdAt },
      { secret: refreshKey, expiresIn: expireTime },
    );
    res.setHeader('Access-Control-Allow-Origin', `${process.env.ALLOW_ORIGIN_URL}`);
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; Path=/; HttpOnly`);

    return 'return';
  }

  logout() {
    return 'logout API';
  }
}
