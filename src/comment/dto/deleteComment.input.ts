import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentInput {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '댓글 작성자',
    example: 'jhyeom1545@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  boardId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '댓글 내용',
    example: '댓글 내용 예시',
  })
  comment: string;
}
