import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/models/create-user.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TodoDto } from 'src/models/create-todo.dto';
import { TodosService } from 'src/todos/todos.service';
import { Response, Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly todosService: TodosService,
  ) {}
  @Post('create')
  async register(@Body() user: User) {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    const res = await this.usersService.createUser(
      user.userName,
      user.email,
      hashedPassword,
    );
    return res;
  }

  @Post('login')
  async login(
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwt_token = await this.usersService.login(userEmail, userPassword);
    response.cookie('jwt', jwt_token, { httpOnly: true });
    return { access_token: jwt_token, message: 'Sucess' };
  }

  // Getting the cookie and access the information in it
  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.usersService.getVerifyUser(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      const { password, ...res } = data.user;
      return res;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Get(':email')
  async getUser(@Param('email') userEmail: string) {
    const user = await this.usersService.getUser(userEmail);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(@Req() req) {
    console.log(req.user);
    return this.usersService.getUsers();
  }

  @Post('createTodo')
  async createTodo(@Body() todo: TodoDto) {
    const user = await this.usersService.findUser('ravi@gmail.com');
    console.log(user._id);
    const res = await this.todosService.createTodo(todo, user._id);
    console.log('UserId' + res);
  }

  @Get('getTodos/:email')
  async getTodos(@Param('email') userEmail: string) {
    const user = await this.usersService.findUser('ravi@gmail.com');
    console.log(user._id);
    const res = await this.todosService.getAllTodos(user._id);
    return res;
  }

  @Delete(':id')
  async deleteTodo(@Param('id') todoId: string) {
    return this.todosService.removeTodo(todoId);
  }
}
