import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class loginResponseDto {
  @ApiProperty({
    description: '리프레쉬 토큰',
    example: 'dGVzdEBnbWFpbC5jb206cGFzc3dvcmQ=',
  })
  refreshToken: string;

  @ApiProperty({
    description: '엑세스 토큰',
    example: 'dGVzdEBnbWFpbC5jb206cGFzc3dvcmQ=',
  })
  accessToken: string;

  static of(refreshToken: string, accessToken: string): loginResponseDto {
    return {
      refreshToken,
      accessToken,
    };
  }
}
