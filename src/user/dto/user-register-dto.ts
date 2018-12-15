import { ApiModelProperty } from '@nestjs/swagger';
import { UserModel } from '../../models';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UserRegisterDto = Omit<UserModel, 'id'>;
export type UserRegisterResponseDto = Omit<UserModel, 'password'>;

export class UserLoginRequestDto {
  @ApiModelProperty()
  email: string;
  @ApiModelProperty()
  password: string;
}

export class UserLoginResponseDto {
  @ApiModelProperty()
  token: string;
  @ApiModelProperty()
  user: UserModel;
}
