import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateBoardInput {
  @ApiProperty({ example: '게시글 제목' })
  title: string;

  @ApiProperty({ example: '게시글 내용' })
  content: string;

  @IsEmail()
  @ApiProperty({ example: 'jhyeom1545@gmail.com' })
  email: string;
}
