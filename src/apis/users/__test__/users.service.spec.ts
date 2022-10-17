import { Test, TestingModule } from '@nestjs/testing';
import { User404Error } from 'src/common/Error.type';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
  findOne: jest.fn(),
});

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: MockRepository<User>;
  let user: User;
  let user404Error: User404Error;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: 'UserRepository', useFactory: mockRepository },
      ],
    }).compile();
    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get('UserRepository') as MockRepository<User>;

    user = {
      email: 'jhyeom1545@gmail.com',
      name: '홍길동',
      points: 500,
      password: '12345',
      createdAt: new Date('2022-10-11T18:47:32.165Z'),
      updatedAt: new Date('2022-10-11T18:47:32.165Z'),
      deletedAt: null,
    };

    user404Error = {
      statusCode: 404,
      message: '존재하지 않는 이메일입니다.',
      error: 'Not Found',
    };
  });

  it('유저 서비스 toBeDefined 테스트', () => {
    expect(usersService).toBeDefined();
  });

  describe('유저 조회', () => {
    it('toBeDefined 테스트', () => {
      expect(usersService.findOne).toBeDefined();
    });
    it('유효한 email', async () => {
      const spyGet = jest
        .spyOn(usersRepository, 'findOne')
        .mockResolvedValue(user);
      const result = await usersService.findOne({ email: user.email });
      expect(spyGet).toBeCalledTimes(1);
      expect(result).toEqual(user);
    });
    it('유효하지 않은 email', async () => {
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(user404Error);
      const result2 = jest.spyOn(usersRepository, 'findOne').getMockName();
      const result = await usersService.findOne({ email: user.email });
      console.log(result2); //
      expect(result).toEqual(user404Error);
    });
  });
});
