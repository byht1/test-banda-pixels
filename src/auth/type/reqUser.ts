import { UserDocument } from 'src/db-schema/user.schema';

export interface IRequestUser extends Express.Request {
  user: UserDocument;
  currentToken: string;
}
