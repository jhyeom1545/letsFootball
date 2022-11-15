import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginInput {
  @ApiProperty({ description: '이메일', example: 'jhyeom1545@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: '비밀번호 (8~20글자 영문/숫자)',
    example: 'password1234',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^&*()+|=]{8,20}$/, {
    message: '비밀번호 양식에 맞게 작성하세요.',
  })
  @IsNotEmpty()
  readonly password: string;
}
