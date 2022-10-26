import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/createUser.Input';
import { UpdateUserInput } from './dto/updateUser.Input';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAccessGuard } from 'src/common/auth/guard/jwtAccess.guard';
import { UpdateUserResponse, removeUserResponse } from 'src/common/type/response.type';
import { AuthError401, UserError404, UserError409 } from 'src/common/type/error.type';

@ApiTags('User')
@Controller({ path: 'api/', version: 'v1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * @summery 유저 생성 API
   * @argument createUserInput
   * @returns User
   */
  @Post('user')
  @ApiOperation({
    description: 'email, password, name을 입력받아 회원가입을 진행합니다',
    summary: '유저 회원 가입',
  })
  @ApiProperty({ type: CreateUserInput })
  @ApiOkResponse({ type: User, description: '회원가입 성공' })
  @ApiConflictResponse({ type: UserError409, description: '이미 가입된 회원일 때' })
  create(@Body(ValidationPipe) createUserInput: CreateUserInput): Promise<User> {
    return this.usersService.create({ createUserInput });
  }

  /**
   * @Summary 유저 조회 API
   * @param email
   * @returns User
   */
  @Get('user/:email')
  @ApiOperation({ description: '유저 이메일을 인자로 받아 유저 정보를 반환합니다.', summary: '유저 조회' })
  @ApiOkResponse({ type: User, description: '유저 조회에 성공' })
  @ApiNotFoundResponse({ type: UserError404, description: '조회하는 이메일이 없을 때' })
  async findOne(@Query('email') email: string): Promise<User> {
    const result = await this.usersService.findOne({ email });
    return result;
  }

  /**
   * @Summary 유저 정보 수정 API
   * @param updateUserInput
   * @returns User
   */
  @Patch('user/:email')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ description: '유저 이메일을 인자로 받아 유저 정보를 반환합니다.', summary: '유저 정보 수정' })
  @ApiBearerAuth('access-token')
  @ApiBody({ type: UpdateUserInput })
  @ApiOkResponse({ type: UpdateUserResponse, description: '유저 정보 수정' })
  @ApiUnauthorizedResponse({ type: AuthError401, description: '로그인 상태가 아닐 때' })
  @ApiNotFoundResponse({ type: UserError404, description: '해당 이메일이 없을 때' })
  update(@Param('email') email: string, @Body() updateUserInput: UpdateUserInput): Promise<User> {
    return this.usersService.update({ email, updateUserInput });
  }

  /**
   * @Summary 유저 탈퇴 API
   * @param email
   * @returns boolean
   */
  @Delete('user/:email')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({
    description: '이메일을 인자로 받아 회원 탈퇴를 진행합니다.',
    summary: '유저 회원 탈퇴',
  })
  @ApiBearerAuth('access-token')
  @ApiUnauthorizedResponse({ type: AuthError401, description: '로그인 상태가 아닐 때' })
  @ApiOkResponse({ type: removeUserResponse, description: '회원 탈퇴 완료' })
  @ApiNotFoundResponse({ type: User, description: '123' })
  remove(@Param('email') email: string): Promise<boolean> {
    return this.usersService.remove({ email });
  }
}
