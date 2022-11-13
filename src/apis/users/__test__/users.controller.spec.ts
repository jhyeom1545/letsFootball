import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersController', () => {
  let userController: UserController;

  const mockUserService = () => ({
    update: jest.fn(),
  });
  const mockRepository = () => ({
    findOne: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: 'UserRepository',
          useFactory: mockRepository,
        },
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });
});
