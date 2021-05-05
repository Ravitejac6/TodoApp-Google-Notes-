import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';
import { LoggerMiddleWare } from './middlewares/logger.middleware';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://raviteja:vishnu123$@sample-cluster.dquap.mongodb.net/sample_db?retryWrites=true&w=majority',
    ),
    AuthModule,
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleWare)
      .forRoutes({ path: 'users/createTodo', method: RequestMethod.POST });
  }
}
