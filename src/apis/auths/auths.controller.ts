import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthsService } from './auths.service';
import { CreateAuthDto } from './dto/createAuth.dto';
import { UpdateAuthDto } from './dto/updateAuth';

@ApiTags('Auth')
@Controller()
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('login')
  logoin(@Body() createAuthDto: CreateAuthDto) {
    return this.authsService.login();
  }

  @Post('logout')
  logout(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authsService.logout();
  }
}
