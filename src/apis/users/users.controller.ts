import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/createUserInput';
import { UpdateUserInput } from './dto/updateUserInput';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { User404Error, User409Error } from 'src/common/Error.type';

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
  @ApiOperation({
    description: 'email, password, name을 입력받아 회원가입을 진행합니다',
    summary: '유저 회원 가입',
  })
  @ApiOkResponse({ type: User, description: '회원가입에 성공' })
  @ApiConflictResponse({ type: User409Error, description: '이미 존재하는 email 입니다.' })
  create(@Body() createUserInput: CreateUserInput): Promise<User> {
    return this.usersService.create({ createUserInput });
  }

  /**
   * @Summary 유저 조회 API
   * @param email
   * @returns User
   */
  @Get()
  @ApiOperation({ description: '유저 이메일을 인자로 받아 유저 정보를 반환합니다.', summary: '유저 조회' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: User, description: '유저 조회에 성공' })
  @ApiNotFoundResponse({ type: User404Error, description: '존재하지 않는 이메일입니다.' })
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
  @ApiOperation({ description: '유저 이메일을 인자로 받아 유저 정보를 반환합니다.', summary: '유저 정보 수정' })
  @ApiOkResponse({ type: User, description: '유저 정보가 수정되었습니다' })
  @ApiNotFoundResponse({ type: User404Error, description: '존재하지 않는 이메일입니다.' })
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserInput) {
    return this.usersService.update({ email, updateUserDto });
  }

  @Delete(':email')
  @ApiOperation({
    description: '이메일을 인자로 받아 회원 탈퇴를 진행합니다.',
    summary: '유저 삭제',
  })
  @ApiOkResponse({ type: 'boolean', description: '회원 탈퇴 완료' })
  @ApiNotFoundResponse({ type: User404Error, description: '존재하지 않는 이메일입니다.' })
  remove(@Param('email') email: string) {
    return this.usersService.remove({ email });
  }
}
