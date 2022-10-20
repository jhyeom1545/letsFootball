import { PartialType } from '@nestjs/swagger';
import { LoginInput } from './loginInput.dto';

export class LogoutInput extends PartialType(LoginInput) {}
