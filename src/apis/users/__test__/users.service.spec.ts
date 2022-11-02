import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserInput } from '../dto/createUser.Input';
import { UpdateUserInput } from '../dto/updateUser.Input';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

// Utility Type을 활용해서 타입 정해주기
// Record를 통해 모든 타입 mocking, partial을 통해 부분적으로 사용 가능
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

// Repository에서 사용되는 함수들 mocking하기
const mockRepository = () => ({
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  save: jest.fn(),
  softDelete: jest.fn(),
});

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockRepository<User>;
  let user: User;
  let updateUserInput: UpdateUserInput;
  let updateUser: User;
  let updateResult: UpdateResult;
  let createUserInput: CreateUserInput;

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

    createUserInput = {
      email: 'jhyeom1545@gmail.com',
      name: '홍길동',
      password: '12345',
    };

    user = {
      email: 'jhyeom1545@gmail.com',
      name: '홍길동',
      points: 500,
      password: '12345',
      createdAt: new Date('2022-10-11T18:47:32.165Z'),
      updatedAt: new Date('2022-10-11T18:47:32.165Z'),
      deletedAt: null,
    };

    updateResult = {
      generatedMaps: [],
      raw: [],
      affected: 1,
    };

    updateUserInput = {
      password: 'abcde',
      name: '이순신',
    };

    updateUser = {
      email: 'jhyeom1545@gmail.com',
      name: '이순신',
      points: 500,
      password: 'abcde',
      createdAt: new Date('2022-10-11T18:47:32.165Z'),
      updatedAt: new Date('2022-10-11T18:47:32.165Z'),
      deletedAt: null,
    };
  });

  it('유저 서비스 toBeDefined 테스트', () => {
    expect(userService).toBeDefined();
  });

  describe('유저 조회', () => {
    it('toBeDefined 테스트', () => {
      expect(userService.findOne).toBeDefined();
    });
    it('유효한 email일 경우 user를 반환합니다.', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      const result = await userService.findOne({ email: user.email });
      expect(result).toEqual(user);
    });
    it('유효하지 않은 email일 경우 404 Error를 반환합니다.', async () => {
      await expect(async () => {
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
        const result = await userService.findOne({ email: user.email });
        console.log(result);
      }).rejects.toThrowError();
    });
  });

  describe('유저 업데이트', () => {
    it('toBeDefined 테스트', () => {
      expect(userService.update).toBeDefined();
    });
    it('유효한 email일 경우 변경된 User를 반환합니다.', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(userRepository, 'save').mockResolvedValue(updateUser);
      const result = await userService.update({ email: user.email, updateUserInput });
      expect(result).toEqual(updateUser);
    });
    it('유효하지 않은 email일 경우 404 Error를 반환합니다.', async () => {
      await expect(async () => {
        await userService.update({ email: 'notValid@naver.com', updateUserInput });
      }).rejects.toThrowError(new NotFoundException('존재하지 않는 이메일입니다.'));
    });
  });

  describe('유저 삭제', () => {
    it('유효한 email로 삭제되면 true를 반환합니다', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(userRepository, 'softDelete').mockReturnValue(updateResult);
      const result = await userService.remove({ email: user.email });
      expect(result).toEqual(true);
    });
    it('유효하지 않은 email일 경우 에러를 반환합니다.', async () => {
      await expect(async () => {
        await userService.remove({ email: user.email });
      }).rejects.toThrowError(new NotFoundException('존재하지 않는 이메일입니다.'));
    });
  });

  describe('유저 회원가입', () => {
    it('유효한 email일 경우 User를 반환합니다', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);
      const result = await userService.create({ createUserInput });
      expect(result).toEqual(user);
    });
    it('유효하지 않은 email일 경우 에러를 반환합니다.', async () => {
      await expect(async () => {
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(new ConflictException('이미 존재하는 email 입니다.'));
        await userService.create({ createUserInput });
      }).rejects.toThrowError(new ConflictException('이미 존재하는 email 입니다.'));
    });
  });
});
