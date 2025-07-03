export const ERROR_CODES = {
  // 인증 관련 (1000번대)
  USER_NOT_FOUND: {
    code: 1000,
    message: '사용자를 찾을 수 없습니다.',
  },
  INVALID_TOKEN_TYPE: {
    code: 1001,
    message: '유효하지 않은 토큰 타입입니다.',
  },
  INVALID_TOKEN: {
    code: 1002,
    message: '유효하지 않은 토큰입니다.',
  },
  EXPIRED_TOKEN: {
    code: 1003,
    message: '토큰이 만료되었습니다.',
  },
  VALIDATION_FAILED: {
    code: 1004,
    message: '유효성 검사에 실패했습니다.',
  },
  FORBIDDEN: {
    code: 1005,
    message: '접근 권한이 없습니다.',
  },
  INVALID_ROLE: {
    code: 1006,
    message: '유효하지 않은 권한(Role)입니다.',
  },
};
