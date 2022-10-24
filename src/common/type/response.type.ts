import { ApiProperty } from '@nestjs/swagger';

export class removeUserResponse {
  @ApiProperty({ example: true })
  response: boolean;
}

export class LoginUserResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpoeWVvbTE1NDVAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMi0xMC0yNFQxNDo0NDoxMi40NDZaIiwiaWF0IjoxNjY2NTkxMzQ2LCJleHAiOjE2NjY1OTg1NDZ9.BVKJkbSubwpt74fiO8I6P7Mgqjm5Y-jzHfmqYCjEbpM',
  })
  accessToken: string;
}
export class UpdateUserResponse {
  @ApiProperty({ example: 'jhyeom1545@gmail.com' })
  email: string;

  @ApiProperty({ example: '이순신' })
  name: string;

  @ApiProperty({ example: 500 })
  points: number;

  @ApiProperty({ example: null })
  deletedAt: Date;

  @ApiProperty({ example: '2022-10-11T18:47:32.165Z' })
  createdAt: Date;

  @ApiProperty({ example: new Date(), description: '수정된 시간' })
  updatedAt: Date;
}
