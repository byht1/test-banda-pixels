import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiHeaders, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/db-schema/user.schema';
import { AuthService } from './auth.service';
import { signUpUserDto } from './dto/signUpUser.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { ValidatePipe } from './pipe/validate.pipe';
import { IRequestUser } from './type';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ status: 201, type: User })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({
    status: 409,
    description: 'Email in use',
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UsePipes(ValidatePipe)
  @Post('signup')
  signUpUser(@Body() body: signUpUserDto) {
    return this.authService.signUpUser(body);
  }

  @ApiResponse({ status: 201, description: 'asses token' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 401, description: 'User does not exist' })
  @ApiResponse({ status: 401, description: 'Incorrect password' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UsePipes(ValidatePipe)
  @Post('signin')
  signInUser(@Body() body: signUpUserDto) {
    return this.authService.signInUser(body);
  }

  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'The token issued to the current user.',
    },
  ])
  @ApiQuery({
    name: 'all',
    description: 'true or false by default false. Sign out of all devices?',
    required: false,
  })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Get('logout')
  logoutUser(@Req() req: IRequestUser, @Query('all') all: boolean) {
    return this.authService.logoutUser(req, !!all);
  }
}
