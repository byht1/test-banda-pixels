import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from 'src/db-schema/user.schema';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const [bearer, token] = req.headers.authorization.split(' ');

    try {
      if (bearer !== 'Bearer' || !token) {
        throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
      }

      const isValidToken = this.jwtService.verify(token);

      const user = await this.usersModel.findById(isValidToken.id);

      if (!user.token.includes(token)) {
        user.token.filter((x) => x !== token);
        user.save();
        throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
      }

      req.user = user;
      req.currentToken = token;

      return true;
    } catch (error) {
      await this.deleteToken(token);
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
  }

  private async deleteToken(token: string): Promise<void> {
    const decode: any = this.jwtService.decode(token);

    const user = await this.usersModel.findById(decode.id);

    user.token = user.token.filter((t) => t !== token);
    console.log('🚀  JwtAuthGuard  user', user);

    user.save();
  }
}
