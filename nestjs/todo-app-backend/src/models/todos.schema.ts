import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UserType } from './user.schema';

@Schema()
export class TodosType {
  @Prop()
  id: String;
  @Prop()
  name: String;
  @Prop()
  description: String;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserType' })
  userId: UserType;
}
