import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = UserType & Document;

@Schema()
export class UserType {
  @Prop()
  userName: String;
  @Prop()
  email: String;
  @Prop()
  password: String;
}

export const UserSchema = SchemaFactory.createForClass(UserType);
