import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/models/create-user.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TodoDto } from 'src/models/create-todo.dto';
import { TodosService } from 'src/todos/todos.service';

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
      user.username,
      user.email,
      hashedPassword,
    );
    return res;
  }

  @Post('login')
  async login(
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
  ) {
    const token = await this.usersService.login(userEmail, userPassword);
    return { access_token: token };
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
}
