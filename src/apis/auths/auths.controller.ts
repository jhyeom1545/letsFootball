import { Controller, Post, Body, Param, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthsService } from './auths.service';
import { LoginInput } from './dto/loginInput.dto';
import { LogoutInput } from './dto/logoutInput';
import { JwtRefreshGuard } from 'src/common/auth/guard/jwtRefresh.guard';
import { CurrentUser, ICurrentUser } from 'src/common/currentUser';

@ApiTags('Auth')
@Controller()
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService, //
  ) {}

  @Post('login')
  @ApiOkResponse({ description: '로그인 성공' })
  @ApiBody({ type: LoginInput })
  @ApiOperation({})
  @ApiCreatedResponse()
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
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
  @ApiResponse({})
  restoreAccessToken(
    @CurrentUser() currentUser: ICurrentUser, //
  ): Promise<string> {
    return this.authsService.getAccessToken({ currentUser });
  }
}
