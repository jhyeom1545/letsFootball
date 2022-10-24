import { ApiProperty } from '@nestjs/swagger';

export class DeleteBoardInput {
  @ApiProperty({ example: 'jhyeom1545@gmail.com' })
  email: string;

  @ApiProperty({ example: 'a05ffad9-7162-4f14-a94f-b8207ce71367' })
  id: string;
}
