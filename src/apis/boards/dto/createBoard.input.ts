import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateBoardInput {
  @IsString()
  @ApiProperty({ example: '게시글 제목' })
  title: string;

  @IsString()
  @ApiProperty({ example: '게시글 내용' })
  content: string;

  @IsEmail()
  @ApiProperty({ example: 'jhyeom1545@gmail.com' })
  email: string;
}
