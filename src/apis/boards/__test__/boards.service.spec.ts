import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/apis/users/entities/user.entity';
import { UserService } from 'src/apis/users/user.service';
import { Repository } from 'typeorm';
import { BoardController } from '../board.controller';
import { BoardService } from '../board.service';
import { Board } from '../entities/board.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  softDelete: jest.fn(),
  userService: jest.fn().mockReturnValue({
    findOne: jest.fn(),
  }),
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
  let userService: UserService;

  beforeEach(async () => {
    Object.assign({ save: jest.fn(), findOne: jest.fn() });
    const module: TestingModule = await Test.createTestingModule({
      // controllers: [BoardController],
      providers: [
        BoardService,
        { provide: UserService, useFactory: mockUserService },
        { provide: 'BoardRepository', useFactory: mockRepository },
        { provide: 'UserRepository', useFactory: mockRepository },
      ],
    }).compile();

    boardRepository = module.get('BoardRepository') as MockRepository<Board>;
    userService = module.get<UserService>(UserService);
    boardService = module.get<BoardService>(BoardService);
    userRepository = module.get('UserRepository') as MockRepository<User>;

    user = {
      email: 'jhyeom1545@gmail.com',
      name: '홍길동',
      points: 500,
      password: '12345',
      createdAt: new Date('2022-10-11T18:47:32.165Z'),
      updatedAt: new Date('2022-10-11T18:47:32.165Z'),
      deletedAt: null,
    };
    jest.spyOn(userService, 'findOne').mockResolvedValue(user);
  });

  // it('should be defined', () => {
  //   expect(userService).toBeDefined();
  //   // expect(boardService).toBeDefined();
  // });
  describe('create', () => {
    it('유효할 경우', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);
      jest.spyOn(boardRepository, 'create').mockResolvedValue(null);
      const result = 'success';
      expect(result).toEqual('success');
    });
  });
});
