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
    if (!(typeof jwt_token == 'string')) {
      return { msg: 'Wrong Credentials' };
    }
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
        throw new UnauthorizedException('User not authorized');
      }
      const { password, ...res } = data.user;
      return res;
    } catch (e) {
      throw new UnauthorizedException('User not authorized');
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'LogOut successfully',
    };
  }

  // @Get(':email')
  // async getUser(@Param('email') userEmail: string) {
  //   const user = await this.usersService.getUser(userEmail);
  //   return user;
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(@Req() req) {
    console.log(req.user);
    return this.usersService.getUsers();
  }

  @Post('createTodo')
  async createTodo(
    @Req() req,
    @Body() todo: TodoDto,
    //@Param('email') userEmail: string,
  ) {
    let userEmail = req.user.email;
    const user = await this.usersService.findUser(userEmail);
    const res = await this.todosService.createTodo(todo, user._id);
    return res;
  }

  @Post('updateTodo')
  async updateTodo(@Body() todo: TodoDto) {
    const res = await this.todosService.updateTodo(todo);
    return res;
  }

  @Get('getTodos')
  async getTodos(@Req() req) {
    console.log(req.user.email);
    let userEmail = req.user.email;
    const user = await this.usersService.findUser(userEmail);
    //console.log(user._id);
    const res = await this.todosService.getAllTodos(user._id);
    return res;
  }

  @Delete(':id')
  async deleteTodo(@Param('id') todoId: string) {
    return this.todosService.removeTodo(todoId);
  }
}
