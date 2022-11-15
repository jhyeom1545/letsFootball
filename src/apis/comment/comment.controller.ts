import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentInput } from './dto/createComment.input';
import { DeleteCommentInput } from './dto/deleteComment.input';
import { UpdateCommentInput } from './dto/updateComment.input';
import { Comment } from './entities/comment.entity';

@ApiTags('Comment')
@Controller('api/')
export class CommentController {
  constructor(
    private readonly commentService: CommentService, //
  ) {}

  /**
   * @summery 댓글 생성
   * @argument createCommentInput
   * @returns Comment
   */
  @Post('comment')
  @ApiOperation({ description: 'comment를 인자로 받아 댓글을 작성합니다.', summary: '댓글 생성' })
  @ApiBody({ type: CreateCommentInput })
  @ApiCreatedResponse({ type: Comment })
  create(@Body() createCommentInput: CreateCommentInput): Promise<Comment> {
    return this.commentService.create({ createCommentInput });
  }

  /**
   * @summery 게시글 전체 댓글 조회
   * @argument boardId
   * @returns Comment[]
   */
  @Get('comments/:boardId')
  @ApiOperation({
    description: 'boardId를 인자로 받아 게시글의 댓글을 조회합니다.',
    summary: '게시글의 전체 댓글 조회',
  })
  findAll(@Param('boardId') boardId: string): Promise<Comment[]> {
    return this.commentService.findAll({ boardId });
  }

  /**
   * @summery 댓글 조회
   * @argument commentId
   * @returns Comment
   */
  @Get('comment/:commentId')
  @ApiOperation({ description: 'commentId를 인자로 받아 댓글을 조회합니다.', summary: '댓글 조회' })
  findOne(@Param('commentId') commentId: string): Promise<Comment> {
    return this.commentService.findOneById({ commentId });
  }

  /**
   * @summery 댓글 수정
   * @argument commentId
   * @returns Comment
   */
  @Patch('comment/:commentId')
  @ApiOperation({ description: 'commentId를 인자로 받아 댓글을 수정합니다.', summary: '댓글 수정' })
  update(@Param('commentId') commentId: string, @Body() updateCommentInput: UpdateCommentInput): Promise<Comment> {
    return this.commentService.update({ commentId, updateCommentInput });
  }

  /**
   * @summery 댓글 삭제
   * @argument deleteCommentInput
   * @returns boolean
   */
  @Delete('comment/:commentId')
  @ApiOperation({ description: 'commentId를 인자로 받아 댓글을 삭제합니다.', summary: '댓글 삭제' })
  remove(@Body() deleteCommentInput: DeleteCommentInput): Promise<boolean> {
    return this.commentService.remove({ deleteCommentInput });
  }
}
