import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { IRequestUser } from 'src/auth/type';
import { ResUserInfoDto } from './dto/resUserInfo.dto';
import { UserService } from './user.service';

@ApiTags('Auth')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'The token issued to the current user.',
    },
  ])
  @ApiResponse({ status: 204, type: ResUserInfoDto })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Get('/info')
  info(@Req() req: IRequestUser) {
    return this.userService.info(req.user, req.currentToken);
  }
}
