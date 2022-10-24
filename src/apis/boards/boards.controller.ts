import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAccessGuard } from 'src/common/auth/guard/jwtAccess.guard';
import { AuthError401, BoardError404, UserError404 } from 'src/common/type/error.type';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { UpdateBoardDto } from './dto/updateBoard.input';
import { Board } from './entities/board.entity';

@ApiTags('Board')
@Controller('api/')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  /**
   * @summery 게시글 생성 API
   * @argument createBoardInput
   * @returns Board
   */
  @Post('board')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ description: 'title, content, email을 인자로 받아 게시글을 생성합니다.', summary: '게시글 생성' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({ type: Board, description: '게시글 작성 성공' })
  @ApiNotFoundResponse({ type: UserError404, description: '조회하는 이메일이 없을 때' })
  @ApiUnauthorizedResponse({ type: AuthError401, description: '로그인 상태가 아닐 때' })
  create(@Body() createBoardInput: CreateBoardInput): Promise<Board> {
    return this.boardsService.create({ createBoardInput });
  }

  /**
   * @summery 게시글 전체 조회
   * @returns Board[]
   */
  @Get('boards')
  @ApiOperation({ description: '모든 게시글을 조회합니다.', summary: '게시글 전체 조회' })
  @ApiOkResponse({ type: Board, description: '게시글 조회 성공' })
  findAll(): Promise<Board[]> {
    return this.boardsService.findAll();
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
    return this.boardsService.findOneById({ id });
  }

  @Patch('board/:id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(+id, updateBoardDto);
  }

  @Delete('board/:id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(+id);
  }
}
