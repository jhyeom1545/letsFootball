import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoardInput {
  @ApiProperty({ example: 'a05ffad9-7162-4f14-a94f-b8207ce71367' })
  id: string;

  @ApiProperty({ example: 'jhyeom1545@gmail.com' })
  email: string;

  @ApiProperty({ example: '수정된 제목' })
  title: string;

  @ApiProperty({ example: '수정된 내용' })
  content: string;
}
