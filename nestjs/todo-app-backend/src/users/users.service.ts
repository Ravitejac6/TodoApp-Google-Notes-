import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/create-user.dto';
import { UserDocument } from 'src/models/user.schema';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<UserDocument>,
    private readonly authService: AuthService,
  ) {}
  async createUser(userName, userEmail, userPassword): Promise<String> {
    const newUser = new this.userModel({
      username: userName,
      email: userEmail,
      password: userPassword,
    });
    const res = await newUser.save();
    return res.email;
  }

  async getUser(userEmail: string) {
    const user = await this.findUser(userEmail);
    return {
      username: user.username,
      email: user.email,
      password: user.password,
    };
  }

  async findUser(userEmail: string): Promise<UserDocument> {
    let user;
    try {
      user = await this.userModel.findOne({ email: userEmail }).exec();
    } catch (err) {
      throw new NotFoundException('User cannot found');
    }
    return user;
  }

  async login(userEmail: string, userPassword: string) {
    const user = await this.getUser(userEmail);
    const hashedPassword = user.password.valueOf();
    if (!user) {
      throw new BadRequestException('Wrong Credentials');
    }
    if (!(await bcrypt.compare(userPassword, hashedPassword))) {
      throw new BadRequestException('Wrong Password');
    }
    return this.authService.generateJWT(user);
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    users.map((user) => ({
      username: user.username,
      email: user.email,
    }));
    return users;
  }
}
