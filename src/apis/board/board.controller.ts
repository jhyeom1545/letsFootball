import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAccessGuard } from 'src/common/auth/guard/jwtAccess.guard';
import { AuthError401, BoardError403, BoardError404, UserError404 } from 'src/common/type/error.type';
import { BoardService } from './board.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { DeleteBoardInput } from './dto/deleteBoard.input';
import { UpdateBoardInput } from './dto/updateBoard.input';
import { Board } from './entities/board.entity';

@ApiTags('Board')
@Controller('api/')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  /**
   * @summery 게시글 생성 API
   * @argument createBoardInput
   * @returns Board
   */
  @Post('board')
  @UseGuards(JwtAccessGuard)
  @ApiBody({ type: CreateBoardInput })
  @ApiOperation({ description: 'title, content, email을 인자로 받아 게시글을 생성합니다.', summary: '게시글 생성' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({ type: Board, description: '게시글 작성 성공' })
  @ApiNotFoundResponse({ type: UserError404, description: '조회하는 이메일이 없을 때' })
  @ApiUnauthorizedResponse({ type: AuthError401, description: '로그인 상태가 아닐 때' })
  create(@Body(ValidationPipe) createBoardInput: CreateBoardInput): Promise<Board> {
    return this.boardService.create({ createBoardInput });
  }

  /**
   * @summery 게시글 전체 조회
   * @argument page
   * @returns Board[]
   */
  @Get('boards/:page')
  @ApiOperation({ description: '모든 게시글을 조회합니다.', summary: '게시글 전체 조회' })
  @ApiOkResponse({ type: Board, description: '게시글 조회 성공' })
  findAll(@Param('page') page: number): Promise<Board[]> {
    return this.boardService.findAll({ page });
  }

  /**
   * @summery 게시글 조회
   * @argument id
   * @returns Board
   */
  @Get('board/:id')
  @ApiOperation({ description: 'id를 인자로 받아 게시글을 조회합니다.', summary: '게시글 조회' })
  @ApiOkResponse({ type: Board, description: '게시글 조회 성공' })
  @ApiNotFoundResponse({ type: BoardError404, description: '해당 게시물이 존재하지 않을 때' })
  findOne(@Param('id') id: string) {
    return this.boardService.findOneById({ id });
  }

  /**
   * @summery 게시글 수정
   * @argument updateBoardInput
   * @returns Board
   */
  @Patch('board/:id')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ description: '인자로 받아 게시글을 수정합니다.', summary: '게시글 수정' })
  @ApiOkResponse({ type: Board, description: '게시글 수정 성공' })
  @ApiNotFoundResponse({ type: BoardError404, description: '해당 게시글이 존재하지 않을 때' })
  @ApiForbiddenResponse({ type: BoardError403, description: '본인이 작성한 게시글이 아닐 때' })
  @ApiUnauthorizedResponse({ type: AuthError401, description: '로그인한 사용자가 아닐 때' })
  update(@Body(ValidationPipe) { updateBoardInput }: { updateBoardInput: UpdateBoardInput }): Promise<Board> {
    return this.boardService.update({ updateBoardInput });
  }

  /**
   * @summery 게시글 삭제
   * @argument id
   * @returns boolean
   */
  @Delete('board/:id')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ description: '게시글 id를 인자로 받아 게시글을 삭제합니다.', summary: '게시글 삭제' })
  @ApiOkResponse({ description: 'true' })
  @ApiNotFoundResponse({ type: BoardError404, description: '해당 게시글이 존재하지 않을 때' })
  @ApiForbiddenResponse({ type: BoardError403, description: '본인이 작성한 게시글이 아닐 때' })
  @ApiUnauthorizedResponse({ type: AuthError401, description: '로그인한 사용자가 아닐 때' })
  remove(@Body(ValidationPipe) deleteBoardInput: DeleteBoardInput): Promise<boolean> {
    return this.boardService.remove({ deleteBoardInput });
  }
}
