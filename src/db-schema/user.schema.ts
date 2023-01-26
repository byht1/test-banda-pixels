import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { EIdType } from 'src/auth/helpers';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @ApiProperty({ name: '_id', example: '63c5520db80f2638a733ff97' })
  _id: ObjectId;

  @ApiProperty({ example: 'Login user' })
  @Prop({
    type: String,
    required: true,
  })
  id: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @ApiProperty({ example: 'Method of registration' })
  @Prop({
    type: String,
    enum: ['phone', 'email'],
    required: true,
  })
  id_type: EIdType;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiI.eyJpZCI6IjYLCJpYXQiOjE2NjU2NTM2NgsImV4cCI6MTY2NTc0MDA3OH0.mZMKEw1j3N9VVZ97E',
  })
  @Prop()
  token: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
