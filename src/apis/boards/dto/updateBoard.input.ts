import { PartialType } from '@nestjs/swagger';
import { CreateBoardDto } from './createBoard.input';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {}
