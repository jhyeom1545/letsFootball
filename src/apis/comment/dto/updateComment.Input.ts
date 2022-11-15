import { PartialType } from '@nestjs/swagger';
import { CreateCommentInput } from './createComment.input';

export class UpdateCommentInput extends PartialType(CreateCommentInput) {}
