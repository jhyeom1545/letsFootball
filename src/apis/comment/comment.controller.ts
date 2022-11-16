import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAccessGuard } from 'src/common/auth/guard/jwtAccess.guard';
import { BoardError403, Comment404 } from 'src/common/type/error.type';
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
  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ description: 'comment를 인자로 받아 댓글을 작성합니다.', summary: '댓글 생성' })
  @ApiBody({ type: CreateCommentInput })
  @ApiCreatedResponse({ type: Comment, description: '댓글 생성 성공' })
  @ApiNotFoundResponse({ type: Comment404, description: '해당 댓글을 찾을 수 없을 때' })
  create(@Body(ValidationPipe) createCommentInput: CreateCommentInput): Promise<Comment> {
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
  @ApiOkResponse({ type: Comment, description: '댓글을 조회하였습니다.' })
  @ApiNotFoundResponse({ type: Comment404, description: '해당 댓글을 찾을 수 없을 때' })
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
  @ApiOkResponse({ type: Comment, description: '댓글을 조회하였습니다.' })
  @ApiNotFoundResponse({ type: Comment404, description: '해당 댓글을 찾을 수 없을 때' })
  findOne(@Param('commentId') commentId: string): Promise<Comment> {
    return this.commentService.findOneById({ commentId });
  }

  /**
   * @summery 댓글 수정
   * @argument commentId
   * @returns Comment
   */
  @Patch('comment/:commentId')
  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('access-token')
  @ApiBody({ type: UpdateCommentInput })
  @ApiOperation({ description: 'commentId를 인자로 받아 댓글을 수정합니다.', summary: '댓글 수정' })
  @ApiOkResponse({ type: Comment, description: '댓글이 수정되었습니다.' })
  @ApiNotFoundResponse({ type: Comment404, description: '해당 댓글을 찾을 수 없을 때' })
  @ApiForbiddenResponse({ type: BoardError403, description: '본인이 작성한 게시글이 아닐 때' })
  update(
    @Param('commentId') commentId: string,
    @Body(ValidationPipe) updateCommentInput: UpdateCommentInput,
  ): Promise<Comment> {
    return this.commentService.update({ commentId, updateCommentInput });
  }

  /**
   * @summery 댓글 삭제
   * @argument deleteCommentInput
   * @returns boolean
   */
  @Delete('comment/:commentId')
  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ type: Boolean, description: '댓글이 삭제 되었습니다.' })
  @ApiNotFoundResponse({ type: Comment404, description: '해당 댓글을 찾을 수 없을 때' })
  @ApiOperation({ description: 'commentId를 인자로 받아 댓글을 삭제합니다.', summary: '댓글 삭제' })
  remove(@Body(ValidationPipe) deleteCommentInput: DeleteCommentInput): Promise<boolean> {
    return this.commentService.remove({ deleteCommentInput });
  }
}
