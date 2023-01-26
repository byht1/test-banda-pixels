import { ApiProperty } from '@nestjs/swagger';
import { EIdType } from 'src/auth/helpers';

export class ResUserInfoDto {
  @ApiProperty({ example: 'Id User' })
  readonly id: string;

  @ApiProperty({ example: EIdType })
  readonly id_type: EIdType;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiI.eyJpZCI6IjYLCJpYXQiOjE2NjU2NTM2NgsImV4cCI6MTY2NTc0MDA3OH0.mZMKEw1j3N9VVZ97E',
  })
  readonly token: string;
}
