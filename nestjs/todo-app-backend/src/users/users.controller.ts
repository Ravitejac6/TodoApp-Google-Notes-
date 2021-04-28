import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/models/user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('create')
  async register(@Body() user: User) {
    const res = await this.usersService.createUser(user);
    return res;
  }

  @Get(':email')
  async getUser(@Param('email') userEmail: string) {
    const user = await this.usersService.getUser(userEmail);
    return user;
  }
}
