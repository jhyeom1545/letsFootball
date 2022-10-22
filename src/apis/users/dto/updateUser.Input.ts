import { PartialType, PickType } from '@nestjs/swagger';
import { CreateUserInput } from './createUser.Input';

export class UpdateUserInput extends PickType(CreateUserInput, ['password', 'name']) {}
