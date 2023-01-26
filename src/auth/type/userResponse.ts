import { UserDocument } from 'src/db-schema/user.schema';

export type TUserResponse = Omit<UserDocument, 'token'> & {
  token: string;
};
