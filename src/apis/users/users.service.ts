import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/createUserInput';
import { UpdateUserInput } from './dto/updateUserInput';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async create(createUserInput: CreateUserInput): Promise<User> {
    const { email, name, password } = createUserInput;

    // email 존재하는지 확인하기
    const isValidEmail = this.usersRepository.findOne({
      where: { email: email },
    });

    if (!isValidEmail) {
      throw new ConflictException('email이 존재합니다.');
    }

    return await this.usersRepository.save({ email, name, password });
  }

  async findOne({ email }: { email: string }): Promise<User> {
    const result = await this.usersRepository.findOne({
      where: { email },
    });
    // 이메일 존재하는지 확인
    if (!result) {
      throw new NotFoundException('존재하지 않는 이메일입니다.');
    }
    return result;
  }

  update(id: number, updateUserDto: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
