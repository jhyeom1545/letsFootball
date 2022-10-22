import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
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
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAccessGuard } from 'src/common/auth/guard/jwtAccess.guard';
import { ErrorType } from 'src/common/Error.type';

@ApiTags('User')
@Controller({ path: 'user', version: 'v1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * @summery 유저 생성 API
   * @argument createUserInput
   * @returns User
   */
  @Post()
  // @ApiBody({ type: User })
  @ApiOperation({
    description: 'email, password, name을 입력받아 회원가입을 진행합니다',
    summary: '유저 회원 가입',
  })
  @ApiOkResponse({ type: User, description: '회원가입에 성공' })
  @ApiConflictResponse({ type: User, description: ErrorType.user.userNotFound.msg })
  create(@Body() createUserInput: CreateUserInput): Promise<User> {
    return this.usersService.create({ createUserInput });
  }

  /**
   * @Summary 유저 조회 API
   * @param email
   * @returns User
   */
  @Get()
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ description: '유저 이메일을 인자로 받아 유저 정보를 반환합니다.', summary: '유저 조회' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: User, description: '유저 조회에 성공' })
  @ApiNotFoundResponse({ type: User, description: ErrorType.user.userNotFound.msg })
  async findOne(@Query('email') email: string): Promise<User> {
    const result = await this.usersService.findOne({ email });
    delete result.password;
    return result;
  }

  /**
   * @Summary 유저 정보 수정 API
   * @param updateUserInput
   * @returns User
   */
  @Patch(':email')
  @ApiBody({ type: User })
  @ApiOperation({ description: '유저 이메일을 인자로 받아 유저 정보를 반환합니다.', summary: '유저 정보 수정' })
  @ApiOkResponse({ type: User, description: '유저 정보가 수정되었습니다' })
  @ApiNotFoundResponse({ type: User, description: ErrorType.user.userNotFound.msg })
  update(@Param('email') email: string, @Body() updateUserInput: UpdateUserInput) {
    return this.usersService.update({ email, updateUserInput });
  }

  @Delete(':email')
  @ApiOperation({
    description: '이메일을 인자로 받아 회원 탈퇴를 진행합니다.',
    summary: '유저 삭제',
  })
  @ApiOkResponse({ type: 'boolean', description: '회원 탈퇴 완료' })
  @ApiNotFoundResponse({ type: User, description: ErrorType.user.userNotFound.msg })
  remove(@Param('email') email: string): Promise<boolean> {
    return this.usersService.remove({ email });
  }
}
