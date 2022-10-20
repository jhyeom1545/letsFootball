import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/createUserInput';
import { UpdateUserInput } from './dto/updateUserInput';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async create({ createUserInput }: { createUserInput: CreateUserInput }): Promise<User> {
    const { email, name, password } = createUserInput;
    const points = 500;

    // 비밀번호 암호화 하기
    const hashedPassword = await bcrypt.hash(password, 10);

    // email 존재하는지 확인하기
    const isValidEmail = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (isValidEmail) throw new ConflictException('이미 존재하는 email 입니다.');

    return await this.usersRepository.save({
      email,
      name,
      password: hashedPassword,
      points,
    });
  }

  async findOne({ email }: { email: string }): Promise<User> {
    const result = await this.usersRepository.findOne({
      where: { email },
    });
    // 이메일 존재하는지 확인
    if (!result) throw new NotFoundException('존재하지 않는 이메일입니다.');
    return result;
  }

  async update({ email, updateUserInput }: { email: string; updateUserInput: UpdateUserInput }) {
    const user = await this.findOne({ email });
    return await this.usersRepository.save({
      ...user,
      ...updateUserInput,
    });
  }

  async remove({ email }: { email: string }): Promise<boolean> {
    const user = await this.findOne({ email });
    const result = await this.usersRepository.softDelete({ email: user.email });
    return result.affected ? true : false;
  }
}
