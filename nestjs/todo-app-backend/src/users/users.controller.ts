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
}
