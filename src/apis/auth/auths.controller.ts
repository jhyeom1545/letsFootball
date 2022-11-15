import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auths.service';
import { LoginInput } from './dto/login.Input';
import { JwtRefreshGuard } from 'src/common/auth/guard/jwtRefresh.guard';
import { CurrentUser, ICurrentUser } from 'src/common/currentUser';
import { LoginUserResponse } from 'src/common/type/response.type';
import { Error403, Error500, UserError404 } from 'src/common/type/error.type';

@ApiTags('Auth')
@Controller('api/')
export class AuthController {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @Post('login')
  @ApiOperation({ description: 'email, password를 인자로 받아 access-token을 받습니다.', summary: '로그인' })
  @ApiBody({ type: LoginInput })
  @ApiCreatedResponse({ type: LoginUserResponse, description: '로그인 성공' })
  @ApiNotFoundResponse({ type: UserError404, description: '조회하는 이메일이 없을 때' })
  @ApiForbiddenResponse({ type: Error403, description: '비밀번호가 틀렸을 때' })
  logoin(
    @Body() loginInput: LoginInput,
    @Res({ passthrough: true }) res: Response, //
  ) {
    return this.authService.login({ loginInput, res });
  }

  @Post('restoreAccessToken')
  @UseGuards(JwtRefreshGuard)
  @ApiOperation({
    description: 'AccessToken을 재발급 합니다.',
    summary: 'AccessToken 재발급',
  })
  @ApiCreatedResponse({ type: LoginUserResponse })
  @ApiInternalServerErrorResponse({ type: Error500 })
  restoreAccessToken(
    @CurrentUser() currentUser: ICurrentUser, //
  ): Promise<string> {
    return this.authService.getAccessToken({ currentUser });
  }
}
