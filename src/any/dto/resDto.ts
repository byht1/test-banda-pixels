import { ApiProperty } from '@nestjs/swagger';

export class ResLatencyDto {
  @ApiProperty({ example: 'Execution time' })
  readonly time: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiI.eyJpZCI6IjYLCJpYXQiOjE2NjU2NTM2NgsImV4cCI6MTY2NTc0MDA3OH0.mZMKEw1j3N9VVZ97E',
  })
  readonly token: string;
}
