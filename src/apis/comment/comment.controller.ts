import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentInput } from './dto/createComment.Input';
import { DeleteCommentInput } from './dto/deleteComment.input';
import { UpdateCommentInput } from './dto/updateComment.Input';
import { Comment } from './entities/comment.entity';

@ApiTags('Comment')
@Controller()
export class CommentController {
  constructor(
    private readonly commentService: CommentService, //
  ) {}

  @Post('comment')
  @ApiOperation({ description: 'comment를 인자로 받아 댓글을 작성합니다.', summary: '댓글 생성' })
  @ApiBody({ type: CreateCommentInput })
  @ApiCreatedResponse({ type: Comment })
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
  remove(@Body() deleteCommentInput: DeleteCommentInput): Promise<boolean> {
    return this.commentService.remove({ deleteCommentInput });
  }
}
