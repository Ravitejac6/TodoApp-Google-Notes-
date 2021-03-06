import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UserSchema } from 'src/models/user.schema';
import { TodosModule } from 'src/todos/todos.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
    AuthModule,
    TodosModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
