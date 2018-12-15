import { UserModel } from '../../models';
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UserRegisterDto = Omit<UserModel, 'id'>;
export type UserRegisterResponseDto = Omit<UserModel, 'password'>;

export interface UserLoginRequestDto {
  email: string;
  password: string;
}

export interface UserLoginResponseDto {
  token: string;
  user: UserModel;
}
