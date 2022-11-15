export const ErrorType = {
  user: {
    notFound: {
      /*
       * MESSAGE - 존재하지 않는 이메일 입니다.
       */
      code: 404,
      msg: '유저 정보를 찾을 수 없습니다.',
    },
    conflict: {
      code: 409,
      msg: '이미 존재하는 이메일 입니다.',
    },
  },
  board: {
    notFound: {
      /*
       * MESSAGE - 해당 게시글이 존재하지 않습니다.
       */
      code: 404,
      msg: '해당 게시글이 존재하지 않습니다.',
    },
    forbidden: {
      /**
       * MESSAGE - 본인의 게시글만 접근이 가능합니다.
       */
      code: 403,
      msg: '본인의 게시글만 접근이 가능합니다.',
    },
  },
  comment: {
    notFound: {
      /**
       * MESSAGE - 해당 댓글을 찾을 수 없습니다.
       */
      code: 404,
      msg: '해당 댓글을 찾을 수 없습니다.',
    },
  },
};
