import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { DeleteBoardInput } from './dto/deleteBoard.input';
import { UpdateBoardInput } from './dto/updateBoard.input';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,

    private readonly usersService: UsersService,
  ) {}

  async create({ createBoardInput }: { createBoardInput: CreateBoardInput }): Promise<Board> {
    const { email } = createBoardInput;
    const userEmail = await this.usersService.findOne({ email });

    const result = await this.boardsRepository.save({
      user: userEmail,
      ...createBoardInput,
    });
    return result;
  }

  async findAll({ page }): Promise<Board[]> {
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
    if (!result) throw new NotFoundException('해당 게시글이 존재하지 않습니다.');
    return result;
  }

  async update({ updateBoardInput }: { updateBoardInput: UpdateBoardInput }): Promise<Board> {
    const { email, id } = updateBoardInput;
    // 입력받은 유저가 유효한지 조회합니다.
    const user = await this.usersService.findOne({ email });

    // 입력받은 게시글이 유효한지 조회합니다.
    const board = await this.findOneById({ id });

    // 조회한 유저가 게시글 작성자와 동일한지 확인합니다.
    if (user.email !== board.email) throw new ForbiddenException('본인의 게시글만 접근이 가능합니다.');

    const result = this.boardsRepository.save({
      ...updateBoardInput,
    });
    return result;
  }

  async remove({ deleteBoardInput }: { deleteBoardInput: DeleteBoardInput }): Promise<boolean> {
    const { email, id } = deleteBoardInput;
    // 입력받은 유저가 유효한지 조회합니다.
    const user = await this.usersService.findOne({ email });

    // 입력받은 게시글이 유효한지 조회합니다.
    const board = await this.findOneById({ id });

    // 조회한 유저가 게시글 작성자와 동일한지 확인합니다.
    if (user.email !== board.email) throw new ForbiddenException('본인의 게시글만 접근이 가능합니다.');

    const result = await this.boardsRepository.softDelete({ id: board.id });
    return result.affected ? true : false;
  }
}
