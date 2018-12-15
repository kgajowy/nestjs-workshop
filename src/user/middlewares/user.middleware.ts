import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import { TOKEN_HEADER_NAME } from '../../config';
import { UserService } from '../services/user.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {
  }

  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      if (req.headers[TOKEN_HEADER_NAME]) {
        const payload = this.userService.tokenDecode(req.headers[TOKEN_HEADER_NAME]);
        if (payload) {
          req.user = payload;
        }
      }
      next();
    };
  }
}
