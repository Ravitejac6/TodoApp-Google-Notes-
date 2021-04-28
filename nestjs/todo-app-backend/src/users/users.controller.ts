import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/models/user';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
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
    return this.usersService.login(userEmail, userPassword);
  }

  @Get(':email')
  async getUser(@Param('email') userEmail: string) {
    const user = await this.usersService.getUser(userEmail);
    return user;
  }
}
