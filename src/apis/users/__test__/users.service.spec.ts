import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ErrorType } from '../../../common/type/Message.type';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const userEmail = 'jhyeom1545@gmail.com';

const user = {
  email: 'jhyeom1545@gmail.com',
  name: '홍길동',
  points: 500,
  password: '12345',
  createdAt: new Date('2022-10-11T18:47:32.165Z'),
  updatedAt: new Date('2022-10-11T18:47:32.165Z'),
  deletedAt: null,
};

const mockRepository = () => ({
  save: jest.fn(),
  findOne: jest.fn(),
  softDelete: jest.fn(),
});

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'UserRepository',
          useFactory: mockRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get('UserRepository') as MockRepository<User>;
  });

  it('유저 서비스 toBeDefined 테스트', () => {
    expect(userService).toBeDefined();
  });

  describe('userService.findOne', () => {
    it('유효한 email일 경우 user를 반환합니다.', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      const validUser = userEmail;
      const result = await userService.findOne({ email: validUser });
      expect(result).toBe(user);
    });
    it('유효하지 않은 email일 경우 예외를 발생시킵니다.', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
      await expect(async () => {
        await userService.findOne({ email: 'isnotValid@naver.com' });
      }).rejects.toThrowError(new NotFoundException(ErrorType.user.notFound.msg));
    });
  });
  describe('userService.create', () => {
    const createUserInput = {
      email: 'jhyeom1545@gmail.com',
      name: '홍길동',
      password: '12345',
    };
    it('회원 정보가 없는 이메일일 경우 user를 반환합니다.', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);
      const result = await userService.create({ createUserInput });
      expect(result).toBe(user);
    });
    it('이미 가입된 이메일일 경우 예외를 발생시킵니다.', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(userEmail);
      await expect(async () => {
        await userService.create({ createUserInput });
      }).rejects.toThrowError(new ConflictException(ErrorType.user.conflict.msg));
    });
  });

  describe('userService.update', () => {
    const updateUserInput = {
      password: 'abcde',
      name: '이순신',
    };

    const updatedUser = {
      email: 'jhyeom1545@gmail.com',
      name: '이순신',
      points: 500,
      password: 'abcde',
      createdAt: new Date('2022-10-11T18:47:32.165Z'),
      updatedAt: new Date('2022-10-11T18:47:32.165Z'),
      deletedAt: null,
    };
    it('유효한 email일 경우 수정된 user를 반환합니다.', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(userRepository, 'save').mockResolvedValue(updatedUser);
      const result = await userService.update({ email: userEmail, updateUserInput });
      expect(result).toBe(updatedUser);
    });
    it('유효하지 않은 email일 경우 예외를 발생시킵니다.', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
      await expect(async () => {
        await userService.update({ email: userEmail, updateUserInput });
      }).rejects.toThrowError(new ConflictException(ErrorType.user.notFound.msg));
    });
  });

  describe('userService.remove', () => {
    it('유효한 email일 경우 softDelete한 결과 true를 반환합니다.', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(userRepository, 'softDelete').mockResolvedValue({ affected: 1 });
      const result = await userService.remove({ email: userEmail });
      console.log(result);
      expect(result).toBeTruthy();
    });
    it('유효하지 않은 email일 경우 예외를 발생시킵니다.', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
      await expect(async () => {
        await userService.remove({ email: userEmail });
      }).rejects.toThrowError(new ConflictException(ErrorType.user.notFound.msg));
    });
  });
});
