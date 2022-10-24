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
import { AuthsService } from './auths.service';
import { LoginInput } from './dto/loginInput.dto';
import { JwtRefreshGuard } from 'src/common/auth/guard/jwtRefresh.guard';
import { CurrentUser, ICurrentUser } from 'src/common/currentUser';
import { LoginUserResponse } from 'src/common/type/response.type';
import { Error403, Error500, UserError404 } from 'src/common/type/error.type';

@ApiTags('Auth')
@Controller()
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService, //
  ) {}

  @Post('login')
  @ApiBody({ type: LoginInput })
  @ApiCreatedResponse({ type: LoginUserResponse, description: '로그인 성공' })
  @ApiNotFoundResponse({ type: UserError404, description: '조회하는 이메일이 없을 때' })
  @ApiForbiddenResponse({ type: Error403, description: '비밀번호가 틀렸을 때' })
  logoin(
    @Body() loginInput: LoginInput,
    @Res({ passthrough: true }) res: Response, //
  ) {
    return this.authsService.login({ loginInput, res });
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
    return this.authsService.getAccessToken({ currentUser });
  }
}
