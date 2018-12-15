import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UserModel } from '../../models';
import { UserLoginRequestDto, UserLoginResponseDto, UserRegisterDto, UserRegisterResponseDto } from '../dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {

  constructor(private userService: UserService) {
  }

  user: UserModel;

  @Get('me')
  getUser(@Query() query: any) {
    return {
      id: 1,
      name: 'Kamil',
      query,
    };
  }

  @Post('me')
  postUser(@Body() body: any) {
    return {
      id: 1,
      name: 'Kamil',
      body,
    };
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  async register(@Body() data: UserRegisterDto): Promise<UserRegisterResponseDto> {
    // await delay();
    this.user = {
      id: 1,
      name: data.name,
      email: data.email,
      password: 'secret',
    };
    const { data: some, ...rest } = this.user;
    return rest;
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'get user by token', type: UserLoginResponseDto})
  async login(@Body() credentials: UserLoginRequestDto): Promise<UserLoginResponseDto> {
    if (credentials.password !== '123') {
      throw new HttpException('ValidationError', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    if (!this.user) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    return {
      token: this.userService.tokenSign({ user: this.user }),
      user: this.user,
    };
  }
}

const delay = (time = 2000) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};
