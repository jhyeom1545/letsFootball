import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty({ example: '게시글 제목' })
  title: string;

  @ApiProperty({ example: '게시글 내용' })
  content: string;
}
