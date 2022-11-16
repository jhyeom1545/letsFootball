import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/apis/user/entities/user.entity';
import { UserService } from 'src/apis/user/user.service';
import { ErrorType } from 'src/common/type/message.type';
import { Repository } from 'typeorm';
import { BoardController } from '../board.controller';
import { BoardService } from '../board.service';
import { Board } from '../entities/board.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const user = {
  email: 'jhyeom1545@gmail.com',
  name: '홍길동',
  points: 500,
  password: '12345',
  createdAt: new Date('2022-10-11T18:47:32.165Z'),
  updatedAt: new Date('2022-10-11T18:47:32.165Z'),
  deletedAt: null,
};

const notValidUser = {
  email: 'fakeUser@gmail.com',
  name: '기성용',
  points: 500,
  password: '12345',
  createdAt: new Date('2022-10-11T18:47:32.165Z'),
  updatedAt: new Date('2022-10-11T18:47:32.165Z'),
  deletedAt: null,
};

const boardId = '6020c315-c982-496e-bb50-f7340c485f1f';
const userEmail = 'jhyeom1545@gmail.com';

const board = {
  id: '6020c315-c982-496e-bb50-f7340c485f1f',
  title: '손흥민 잘한다.',
  content: '이번 월드컵 활약이 대단해요',
  email: 'jhyeom1545@gmail.com',
  deletedAt: null,
  createdAt: '2022-10-11T18:47:32.165Z',
  updatedAt: '2022-10-11T18:47:32.165Z',
  user: {
    email: 'jhyeom1545@gmail.com',
    name: '홍길동',
    points: 500,
    password: '12345',
    createdAt: new Date('2022-10-11T18:47:32.165Z'),
    updatedAt: new Date('2022-10-11T18:47:32.165Z'),
    deletedAt: null,
  },
};

const updateBoardInput = {
  id: '6020c315-c982-496e-bb50-f7340c485f1f',
  email: 'jhyeom1545@gmail.com',
  title: '김민재 화이팅',
  content: '이건 그냥 벽이에요',
};

const updateBoard = {
  id: '6020c315-c982-496e-bb50-f7340c485f1f',
  title: '김민재 화이팅',
  content: '이건 그냥 벽이에요',
  email: 'jhyeom1545@gmail.com',
  deletedAt: null,
  createdAt: '2022-10-11T18:47:32.165Z',
  updatedAt: '2022-10-12T20:00:00.165Z',
};

const deleteBoardInput = {
  email: 'jhyeom1545@gmail.com',
  id: 'a05ffad9-7162-4f14-a94f-b8207ce71367',
};

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
  let userRepository: MockRepository<User>;
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
    jest.spyOn(userService, 'findOne').mockResolvedValue(user);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(boardService).toBeDefined();
  });
  describe('create', () => {
    const createBoardInput = {
      title: '손흥민 잘한다.',
      content: '이번 월드컵 활약이 대단해요',
      email: 'jhyeom1545@gmail.com',
    };
    it('email이 유효할 경우 board를 반환합니다.', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(user);
      jest.spyOn(boardRepository, 'save').mockResolvedValue(board);
      const result = await boardService.create({ createBoardInput });
      expect(result).toEqual(board);
    });
  });
  describe('findAll', () => {
    it('게시글이 생성되어 있다면 모든 게시글을 반환합니다.', async () => {
      jest.spyOn(boardRepository, 'find').mockResolvedValue(board);
      const result = await boardService.findAll({ page: 1 });
      expect(result).toEqual(board);
    });
  });
  describe('findOneById', () => {
    it('게시글 id에 해당하는 게시글이 있다면 게시글을 반환합니다.', async () => {
      jest.spyOn(boardRepository, 'findOne').mockResolvedValue(board);
      const result = await boardService.findOneById({ id: boardId });
      expect(result).toEqual(board);
    });
    it('게시글 id에 해당하는 게시글이 없다면 예외를 발생시킵니다.', async () => {
      await expect(async () => {
        jest.spyOn(boardRepository, 'findOne').mockResolvedValue(undefined);
        await boardService.findOneById({ id: 'notValidBoardId' });
      }).rejects.toThrowError(new NotFoundException(ErrorType.board.notFound.msg));
    });
  });
  describe('update', () => {
    it('업데이트할 게시글의 이메일, 게시글 id가 유효하고 게시글 작성자와 이메일이 일치하면 수정된 게시글을 리턴합니다.', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(boardRepository, 'findOne').mockResolvedValue(board);
      jest.spyOn(boardRepository, 'save').mockResolvedValue(updateBoard);
      const result = await boardService.update({ updateBoardInput });
      expect(result).toEqual(updateBoard);
    });
    it('입력받은 email이 존재하지 않는다면 예외를 발생시킵니다.', async () => {
      await expect(async () => {
        jest.spyOn(userService, 'findOne').mockResolvedValue(undefined);
        await boardService.update({ updateBoardInput });
      }).rejects.toThrowError(new NotFoundException(ErrorType.user.notFound.msg));
    });
    it('게시글 id가 유효하지 않으면 예외를 발생시킵니다.', async () => {
      await expect(async () => {
        jest.spyOn(userService, 'findOne').mockResolvedValue(user);
        jest.spyOn(boardService, 'findOneById').mockResolvedValue(undefined);
        await boardService.update({ updateBoardInput });
      }).rejects.toThrowError(new NotFoundException(ErrorType.board.notFound.msg));
    });
    it('입력받은 email과 게시글 작성자의 email이 동일하지 않으면 예외를 발생시킵니다.', async () => {
      await expect(async () => {
        jest.spyOn(userService, 'findOne').mockResolvedValue(notValidUser);
        jest.spyOn(boardRepository, 'findOne').mockResolvedValue(board);
        await boardService.update({ updateBoardInput });
      }).rejects.toThrowError(new NotFoundException(ErrorType.board.forbidden.msg));
    });
  });
  describe('delete', () => {
    it('삭제할 게시글의 이메일, 게시글 id가 유효하고, 입력받은 이메일과 게시글 작성자의 이메일이 동일하면 게시물을 삭제합니다.', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(user);
      jest.spyOn(boardRepository, 'findOne').mockResolvedValue(board);
      jest.spyOn(boardRepository, 'softDelete').mockResolvedValue({ affected: 1 });
      const result = await boardService.remove({ deleteBoardInput });
      expect(result).toBeTruthy();
    });
    it('입력받은 email이 존재하지 않는다면 예외를 발생시킵니다..', async () => {
      await expect(async () => {
        // jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
        jest.spyOn(userService, 'findOne').mockResolvedValue(undefined);
        await boardService.remove({ deleteBoardInput });
      }).rejects.toThrowError(new NotFoundException(ErrorType.user.notFound.msg));
    });
    it('게시글 id가 유효하지 않으면 예외를 발생시킵니다.', async () => {
      await expect(async () => {
        jest.spyOn(userService, 'findOne').mockResolvedValue(user);
        jest.spyOn(boardRepository, 'findOne').mockResolvedValue(undefined);
        await boardService.remove({ deleteBoardInput });
      }).rejects.toThrowError(new NotFoundException(ErrorType.board.notFound.msg));
    });
    it('입력받은 email과 게시글 작성자의 email이 동일하지 않으면 예외를 발생시킵니다.', async () => {
      await expect(async () => {
        jest.spyOn(userService, 'findOne').mockResolvedValue(notValidUser);
        jest.spyOn(boardRepository, 'findOne').mockResolvedValue(board);
        await boardService.remove({ deleteBoardInput });
      }).rejects.toThrowError(new NotFoundException(ErrorType.board.forbidden.msg));
    });
  });
});
