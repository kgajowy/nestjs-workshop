import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { TokenPayloadDto } from '../dto';

@Injectable()
export class UserService {
  private jswSecret = 'secret';

  tokenSign(payload: TokenPayloadDto): string {
    return jwt.sign(payload, this.jswSecret);
  }

  tokenDecode(token: string): TokenPayloadDto | null {
    return jwt.decode(token);
  }
}
