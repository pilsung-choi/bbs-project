import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { ERROR_CODES } from '../const/error-codes';

export class UserNotFoundException extends BaseException {
  constructor() {
    super(HttpStatus.NOT_FOUND, ERROR_CODES.USER_NOT_FOUND);
  }
}

export class TokenTypeException extends BaseException {
  constructor() {
    super(HttpStatus.UNAUTHORIZED, ERROR_CODES.INVALID_TOKEN_TYPE);
  }
}

export class InvalidTokenException extends BaseException {
  constructor(message?: string) {
    super(HttpStatus.UNAUTHORIZED, ERROR_CODES.INVALID_TOKEN, message);
  }
}

export class ExpiredTokenException extends BaseException {
  constructor() {
    super(HttpStatus.UNAUTHORIZED, ERROR_CODES.EXPIRED_TOKEN);
  }
}

export class InvalidRoleException extends BaseException {
  constructor() {
    super(HttpStatus.FORBIDDEN, ERROR_CODES.INVALID_ROLE);
  }
}
export class ForbiddenException extends BaseException {
  constructor() {
    super(HttpStatus.FORBIDDEN, ERROR_CODES.FORBIDDEN);
  }
}
