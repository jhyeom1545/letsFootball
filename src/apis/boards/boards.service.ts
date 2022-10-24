import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { UpdateBoardDto } from './dto/updateBoard.input';
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
      email: userEmail,
      ...createBoardInput,
    });
    return result;
  }

  async findAll(): Promise<Board[]> {
    return await this.boardsRepository.find({});
  }

  async findOneById({ id }: { id: string }): Promise<Board> {
    const result = await this.boardsRepository.findOne({ where: { id: id } });
    if (!result) throw new NotFoundException('해당 게시글이 존재하지 않습니다.');
    return result;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
