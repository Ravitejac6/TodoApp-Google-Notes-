import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user';
import { UserDocument } from 'src/models/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<UserDocument>,
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
}
