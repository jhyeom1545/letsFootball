import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteCommentInput {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '댓글 작성자',
    example: 'jhyeom1545@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '댓글 ID',
    example: 'uuid',
  })
  commentId: string;
}
