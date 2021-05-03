import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateJWT(user: User): Promise<String> {
    return this.jwtService.signAsync({ user });
  }

  async verifyJWT(cookie: any) {
    return await this.jwtService.verifyAsync(cookie);
  }
}
