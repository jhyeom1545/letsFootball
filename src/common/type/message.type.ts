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
};
