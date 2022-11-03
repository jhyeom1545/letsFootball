import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/apis/users/entities/user.entity';
import { UserService } from 'src/apis/users/user.service';
import { Repository } from 'typeorm';
import { BoardService } from '../board.service';
import { Board } from '../entities/board.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  softDelete: jest.fn(),
});

const mockUserService = () => ({
  findOne: jest.fn(),
});

describe('BoardService', () => {
  let boardService: BoardService;
  let boardRepository: MockRepository<Board>;
  let board: Board;
  let userRepository: MockRepository<User>;
  let user: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardService,
        // { provide: 'UserService', useValue: mockUserService },
        // { provide: UserService, useFactory: mockUserService },
        { provide: 'BoardRepository', useFactory: mockRepository },
        { provide: 'UserRepository', useFactory: mockRepository },
      ],
    }).compile();
    // userService = module.get<UserService>(UserService);
    boardRepository = module.get('BoardRepository') as MockRepository<Board>;
    boardService = module.get<BoardService>(BoardService);
    // userRepository = module.get('UserRepository') as MockRepository<User>;

    user = {
      email: 'jhyeom1545@gmail.com',
      name: '홍길동',
      points: 500,
      password: '12345',
      createdAt: new Date('2022-10-11T18:47:32.165Z'),
      updatedAt: new Date('2022-10-11T18:47:32.165Z'),
      deletedAt: null,
    };
    // jest.spyOn(userService, 'findOne').mockResolvedValue(user);
  });

  it('should be defined', () => {
    // expect(userService).toBeDefined();
    expect(boardService).toBeDefined();
  });
});
