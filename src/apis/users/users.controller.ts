import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/createUserInput';
import { UpdateUserInput } from './dto/updateUserInput';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { User404Error } from 'src/common/Error.type';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * @summery 유저 생성 API
   * @argument createUserInput
   * @returns 'User'
   */
  @Post()
  create(@Body() createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  /**
   * @Summary 유저 조회 API
   * @param email
   * @returns User
   */
  @Get()
  @ApiOperation({
    description: '유저 이메일을 인자로 받아 유저 정보를 반환합니다.',
    summary: '유저 조회',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    type: User,
    description: '유저 조회에 성공하였습니다.',
  })
  @ApiNotFoundResponse({
    type: User404Error,
    description: '존재하지 않는 이메일입니다.',
  })
  async findOne(@Query('email') email: string): Promise<User> {
    const result = await this.usersService.findOne({
      email,
    });
    delete result.password;
    return result;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserInput) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
