import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorType } from 'src/common/type/message.type';
import { Repository } from 'typeorm';
import { UserService } from '../users/user.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { DeleteBoardInput } from './dto/deleteBoard.input';
import { UpdateBoardInput } from './dto/updateBoard.input';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
    private readonly userService: UserService,
  ) {}

  async create({ createBoardInput }: { createBoardInput: CreateBoardInput }): Promise<Board> {
    const { email } = createBoardInput;
    const userEmail = await this.userService.findOne({ email });

    const result = await this.boardsRepository.save({
      user: userEmail,
      ...createBoardInput,
    });
    return result;
  }

  async findAll({ page }: { page: number }): Promise<Board[]> {
    return await this.boardsRepository.find({
      relations: ['user'],
      take: 10,
      skip: (page - 1) * 10,
    });
  }

  async findOneById({ id }: { id: string }): Promise<Board> {
    const result = await this.boardsRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });
    if (!result) throw new NotFoundException(ErrorType.board.notFound.msg);
    return result;
  }

  async update({ updateBoardInput }: { updateBoardInput: UpdateBoardInput }): Promise<Board> {
    const { email, id } = updateBoardInput;
    // 입력받은 유저가 유효한지 조회합니다.
    const user = await this.userService.findOne({ email });
    if (!user) throw new NotFoundException(ErrorType.user.notFound.msg);

    // 입력받은 게시글이 유효한지 조회합니다.
    const board = await this.findOneById({ id });
    if (!board) throw new NotFoundException(ErrorType.board.notFound.msg);

    // 조회한 유저가 게시글 작성자와 동일한지 확인합니다.
    if (user.email !== board.user.email) throw new ForbiddenException(ErrorType.board.forbidden.msg);

    const result = this.boardsRepository.save({
      ...updateBoardInput,
    });
    return result;
  }

  async remove({ deleteBoardInput }: { deleteBoardInput: DeleteBoardInput }): Promise<boolean> {
    const { email, id } = deleteBoardInput;
    // 입력받은 유저가 유효한지 조회합니다.
    const user = await this.userService.findOne({ email });
    if (!user) throw new NotFoundException(ErrorType.user.notFound.msg);

    // 입력받은 게시글이 유효한지 조회합니다.
    const board = await this.findOneById({ id });
    if (!board) throw new NotFoundException(ErrorType.board.notFound.msg);

    // 조회한 유저가 게시글 작성자와 동일한지 확인합니다.
    if (user.email !== board.user.email) throw new ForbiddenException(ErrorType.board.forbidden.msg);

    const result = await this.boardsRepository.softDelete({ id: board.id });
    return result.affected ? true : false;
  }
}
