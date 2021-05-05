import {
  Injectable,
  NestMiddleware,
  Req,
  Request,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LoggerMiddleWare implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  async use(@Request() req, @Res() res: Response, next: NextFunction) {
    let jwt_token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      jwt_token = req.headers.authorization.split(' ')[1];
    }
    const data = await this.authService.verifyJWT(jwt_token);
    if (!data) {
      return next(new UnauthorizedException('User unauthorized'));
    }
    const { password, ...result } = data.user;
    req.user = result;
    next();
  }
}
