import { PartialType } from '@nestjs/swagger';
import { CreateCommentInput } from './createComment.Input';

export class UpdateCommentInput extends PartialType(CreateCommentInput) {}
