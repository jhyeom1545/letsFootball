import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeleteBoardInput } from 'src/apis/boards/dto/deleteBoard.input';
import { CommentService } from './comment.service';
import { CreateCommentInput } from './dto/createComment.Input';
import { UpdateCommentInput } from './dto/updateComment.Input';
import { Comment } from './entities/comment.entity';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService, //
  ) {}

  @Post()
  create(@Body() createCommentInput: CreateCommentInput): Promise<Comment> {
    return this.commentService.create({ createCommentInput });
  }

  @Get(':boardId')
  findAll(@Param('boardId') boardId: string) {
    return this.commentService.findAll({ boardId });
  }

  @Patch(':commentId')
  update(@Param('commentId') commentId: string, @Body() updateCommentInput: UpdateCommentInput) {
    return this.commentService.update({ commentId, updateCommentInput });
  }

  @Delete(':commentId')
  remove(@Param('commentId') commentId: string, @Body() deleteBoardInput: DeleteBoardInput): Promise<boolean> {
    return this.commentService.remove({ commentId, deleteBoardInput });
  }
}
