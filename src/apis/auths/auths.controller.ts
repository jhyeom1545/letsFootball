import { Controller, Post, Body, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthsService } from './auths.service';
import { LoginInput } from './dto/loginInput.dto';
import { LogoutInput } from './dto/logoutInput';

@ApiTags('Auth')
@Controller()
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService, //
  ) {}

  @Post('login')
  logoin(
    @Body() loginInput: LoginInput,
    @Res({ passthrough: true }) res: Response, //
  ) {
    return this.authsService.login({ loginInput, res });
  }

  @Post('logout')
  logout(@Param('id') id: string, @Body() logoutInput: LogoutInput) {
    return this.authsService.logout();
  }
}
