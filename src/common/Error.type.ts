// import { ApiProperty } from '@nestjs/swagger';

// export class User404Error {
//   @ApiProperty({ example: 404 })
//   statusCode: number;

//   @ApiProperty({ example: '존재하지 않는 이메일입니다.' })
//   message: string;

//   @ApiProperty({ example: 'Not Found' })
//   error: string;
// }

// export class User409Error {
//   @ApiProperty({ example: 409 })
//   statusCode: number;

//   @ApiProperty({ example: '이미 존재하는 email 입니다.' })
//   message: string;

//   @ApiProperty({ example: 'Conflict' })
//   error: string;
// }

export const ErrorType = {
  // Auth
  auth: {
    unauthorized: { code: 401, msg: '로그인 후 이용해주세요' },
    validatePassword: { code: 403, msg: '비밀번호가 일치하지 않습니다' },
  },

  // User
  user: {
    userNotFound: { code: 404, msg: '존재하지 않는 유저입니다!' },
    passwordDoesNotMatch: {
      code: 404,
      msg: '비밀번호와 비밀번호 확인이 일치하지 않습니다!',
    },
    hashing: { code: 500, msg: '비밀번호 해싱 에러' },
    emailExist: { code: 409, msg: '해당 이메일은 이미 사용중입니다!' },
  },

  // Feed
  feed: {
    restore: { code: 404, msg: '게시글 복구에 실패하였습니다' },
    delete: { code: 404, msg: '게시글 삭제에 실패하였습니다' },
    notFound: { code: 404, msg: '존재하지 않는 게시글입니다' },
    failLike: { code: 406, msg: '좋아요 처리에 실패하였습니다' },
    notYours: {
      code: 403,
      msg: '본인이 작성한 게시글이어야 수정,삭제,복구할 수 있습니다',
    },
  },
};
