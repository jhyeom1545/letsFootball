import { PartialType } from '@nestjs/swagger';
import { CreateUserInput } from './createUserInput';

export class UpdateUserInput extends PartialType(CreateUserInput) {}
