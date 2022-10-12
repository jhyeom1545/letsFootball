import { ApiProperty } from '@nestjs/swagger';

export class User404Error {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: '존재하지 않는 이메일입니다.' })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;
}
