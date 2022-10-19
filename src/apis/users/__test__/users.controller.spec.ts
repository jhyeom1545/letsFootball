import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

describe('UsersService', () => {
  let usersService: UsersService;

  const mockUsersRepository = {
    findOne: jest.fn().mockImplementation,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    })
      // .overrideProvider(UsersService)
      // .useValue(mockUsersService)
      .compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(UsersService).toBeDefined();
  });
});
