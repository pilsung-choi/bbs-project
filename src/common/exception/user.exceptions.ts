import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { ERROR_CODES } from '../const/error-codes';

export class UserNotFoundException extends BaseException {
  constructor(message?: string) {
    super(
      HttpStatus.BAD_REQUEST,
      ERROR_CODES.USER_NOT_FOUND,
      message,
      'request 유효성 검사 실패 메시지 (ex) 닉네임은 필수입니다. 등.. 입니다.',
    );
  }
}
