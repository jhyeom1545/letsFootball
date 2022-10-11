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
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiResponseProperty,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('User')
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

  @Get()
  @ApiOperation({ description: '유저 조회 API', summary: '유저 조회' })
  @ApiBearerAuth('access_token')
  @ApiOkResponse({
    type: User,
    status: 201,
    description: '유저 조회에 성공하였습니다.',
  })
  @ApiUnauthorizedResponse({
    type: User,
    status: 404,
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
