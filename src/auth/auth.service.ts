import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/db-schema/user.schema';
import { signUpUserDto } from './dto/signUpUser.dto';
import { EIdType } from './helpers';
import { TUserResponse } from './type/userResponse';
import { IRequestUser } from './type';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signUpUser({ id, password }: signUpUserDto): Promise<TUserResponse> {
    const isUser = await this.usersModel.findOne({ id });

    if (isUser) {
      throw new HttpException(
        `a user with this ${isUser.id_type} exists`,
        HttpStatus.CONFLICT,
      );
    }

    const hashPassword = await this.bcryptPassword(password);

    const newUser = await this.usersModel.create({
      id,
      password: hashPassword,
      // перевірка на валідність була в dto
      id_type: id.includes('@') ? EIdType.EMAIL : EIdType.PHONE,
    });

    const newToken = await this.generatorToken(newUser._id);

    const res: { [key: string]: any } = { ...newUser };

    return { ...res._doc, token: newToken };
  }

  async signInUser({ id, password }: signUpUserDto): Promise<string> {
    const user = await this.usersModel.findOne({ id });

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.UNAUTHORIZED);
    }

    await this.passwordIsValid(password, user.password);

    const token = await this.generatorToken(user._id);

    return token;
  }

  async logoutUser(req: IRequestUser, all: boolean): Promise<void> {
    const user = req.user;
    if (all) {
      await this.usersModel.findByIdAndUpdate(user._id, { token: [] });
      return;
    }

    const currentToken = req.currentToken;
    user.token.filter((t) => t !== currentToken);

    await this.usersModel.findByIdAndUpdate(user._id, { token: user.token });
    return;
  }

  async refreshToken(id: ObjectId, currentToken?: string): Promise<string> {
    return await this.generatorToken(id, currentToken);
  }

  private async bcryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private async passwordIsValid(password: string, userPassword: string) {
    const passwordEquals = await bcrypt.compare(password, userPassword);

    if (!passwordEquals) {
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }
  }

  private async generatorToken(
    id: ObjectId,
    currentToken?: string,
  ): Promise<string> {
    const token = this.jwtService.sign({ id });

    const user = await this.usersModel.findById(id);

    if (currentToken) {
      const newArrayToken = [];

      user.token.forEach((t) => {
        if (t === currentToken) return newArrayToken.push(token);
        return newArrayToken.push(t);
      });

      user.token = newArrayToken;
    } else {
      user.token.push(token);
    }
    user.save();

    return token;
  }
}
