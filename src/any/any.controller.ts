import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { IRequestUser } from 'src/auth/type';
import { AnyService } from './any.service';
import { ResLatencyDto } from './dto/resDto';

@ApiTags('Any')
@Controller('any')
export class AnyController {
  constructor(
    private anyService: AnyService,
    private authService: AuthService,
  ) {}

  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'The token issued to the current user.',
    },
  ])
  @ApiResponse({ status: 200, type: ResLatencyDto })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Get('latency')
  async latency(@Req() req: IRequestUser) {
    const startTime = Date.now();
    const newToken = await this.authService.refreshToken(
      req.user._id,
      req.currentToken,
    );
    const finisTime = await this.anyService.latency(startTime);
    return { ...finisTime, token: newToken };
  }
}
