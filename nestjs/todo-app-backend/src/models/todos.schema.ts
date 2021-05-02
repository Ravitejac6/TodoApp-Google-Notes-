import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UserType } from './user.schema';

export type TodosDocument = Document & TodosType;
@Schema()
export class TodosType {
  @Prop()
  id: String;
  @Prop()
  title: String;
  @Prop()
  description: String;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  userId: String;
}

export const TodoSchema = SchemaFactory.createForClass(TodosType);
