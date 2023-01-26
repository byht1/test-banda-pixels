import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserDocument } from 'src/db-schema/user.schema';
import { ResUserInfoDto } from './dto/resUserInfo.dto';

@Injectable()
export class UserService {
  constructor(private authService: AuthService) {}

  async info(user: UserDocument, token: string): Promise<ResUserInfoDto> {
    const newToken = await this.authService.refreshToken(user._id, token);
    return { id: user.id, id_type: user.id_type, token: newToken };
  }
}
