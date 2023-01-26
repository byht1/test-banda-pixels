import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength, Validate } from 'class-validator';
import { CustomTextLength, passwordSchema } from '../helpers';

const { lowerCase, min, number, original, symbol, upperCase } = passwordSchema;

export class signUpUserDto {
  @ApiProperty({ example: 'Id User' })
  @Validate(CustomTextLength)
  readonly id: string;

  @ApiProperty({ example: 'User password' })
  @IsString({ message: 'Must be a string' })
  @Matches(number.reg, {
    message: number.message,
  })
  @Matches(symbol.reg, {
    message: symbol.message,
  })
  @Matches(upperCase.reg, {
    message: upperCase.message,
  })
  @Matches(lowerCase.reg, {
    message: lowerCase.message,
  })
  @MinLength(7, { message: min.message })
  @Matches(original.reg, { message: original.message })
  readonly password: string;
}
