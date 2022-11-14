import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardService } from 'src/apis/boards/board.service';
import { DeleteBoardInput } from 'src/apis/boards/dto/deleteBoard.input';
import { UserService } from 'src/apis/users/user.service';
import { Repository } from 'typeorm';
import { CreateCommentInput } from './dto/createComment.Input';
import { UpdateCommentInput } from './dto/updateComment.Input';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    private readonly userService: UserService,
    private readonly boardService: BoardService,
  ) {}
  async create({ createCommentInput }: { createCommentInput: CreateCommentInput }): Promise<Comment> {
    const { email, comment } = createCommentInput;

    // email이 유효한지 확인
    const userEmail = await this.userService.findOne({ email });
    const result = await this.commentRepository.save({
      comment: comment,
    });
    return result;
  }

  async findOneById({ commentId }: { commentId: string }): Promise<Comment> {
    const result = await this.commentRepository.findOne({ where: { id: commentId } });
    if (!result) throw new NotFoundException('해당 댓글을 찾을 수 없습니다.');

    return result;
  }

  // 게시글의 댓글 조회
  async findAll({ boardId }: { boardId: string }): Promise<Comment[]> {
    const result = await this.commentRepository.find({
      where: {
        board: { id: boardId },
      },
      relations: ['board', 'user'],
    });
    return result;
  }

  async update({ commentId, updateCommentInput }: { commentId: string; updateCommentInput: UpdateCommentInput }) {
    const { email } = updateCommentInput;
    // 작성한 유저 확인
    const user = await this.userService.findOne({ email });

    // 댓글 확인
    const comment = await this.findOneById({ commentId });

    // 수정자와 댓글 작성자 확인
    console.log('---------', user);
    if (user.email !== comment.user.email) throw new ConflictException('작성자만 접근 가능');

    const result = await this.commentRepository.save({
      comment: comment.comment,
    });
    return;
  }

  async remove({
    commentId,
    deleteBoardInput,
  }: {
    commentId: string;
    deleteBoardInput: DeleteBoardInput;
  }): Promise<boolean> {
    return;
  }
}
