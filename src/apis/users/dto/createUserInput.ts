import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class CreateUserInput {
  @ApiProperty({ description: '유저 아이디' })
  @Column()
  email: string;

  @Column()
  @ApiProperty({ description: '유저 패스워드' })
  password: string;

  @Column()
  @ApiProperty()
  name: string;
}
