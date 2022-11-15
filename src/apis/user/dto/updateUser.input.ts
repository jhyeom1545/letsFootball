import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateUserInput } from './createUser.input';

export class UpdateUserInput extends PickType(CreateUserInput, ['password', 'name']) {
  @ApiProperty({ example: '이순신' })
  name: string;

  @ApiProperty({ example: '1234password' })
  password: string;
}
