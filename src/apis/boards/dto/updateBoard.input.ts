import { PartialType } from '@nestjs/swagger';
import { CreateBoardInput } from './createBoard.input';

export class UpdateBoardDto extends PartialType(CreateBoardInput) {}
