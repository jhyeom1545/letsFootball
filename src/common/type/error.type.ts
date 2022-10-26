import { ApiProperty } from '@nestjs/swagger';

export class UserError404 {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: '존재하지 않는 이메일입니다.' })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;
}

export class UserError409 {
  @ApiProperty({ example: 409 })
  statusCode: number;

  @ApiProperty({ example: '이미 존재하는 email 입니다.' })
  message: string;

  @ApiProperty({ example: 'Conflict' })
  error: string;
}

export class BoardError403 {
  @ApiProperty({ example: 403 })
  statusCode: number;

  @ApiProperty({ example: '본인의 게시글만 접근이 가능합니다.' })
  message: string;
}

export class BoardError404 {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: '해당 게시글이 존재하지 않습니다.' })
  message: string;
}

export class AuthError401 {
  @ApiProperty({ example: 401 })
  statusCode: number;

  @ApiProperty({ example: 'Unauthorized' })
  message: string;
}

export class Error500 {
  @ApiProperty({ example: 500 })
  statusCode: number;

  @ApiProperty({ example: 'Internal server error' })
  message: string;
}

export class Error403 {
  @ApiProperty({ example: 403 })
  statusCode: number;

  @ApiProperty({ example: '비밀번호가 틀립니다.' })
  message: string;
}
