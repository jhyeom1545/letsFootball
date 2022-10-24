import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserInput {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: '유저 아이디', //
    example: 'jhyeom1545@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: '비밀번호 (8~20글자 영문/숫자)',
    example: 'password1234',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/, {
    message: '비밀번호 양식에 맞게 작성하세요.',
  })
  @IsNotEmpty()
  @ApiProperty({
    description: '유저 패스워드', //
    example: 'qwerqwer1234!',
  })
  password: string;

  @ApiProperty({
    description: '유저 이름', //
    example: '홍길동',
  })
  name: string;
}
