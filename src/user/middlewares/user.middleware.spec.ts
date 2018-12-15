import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../services/user.service';
import { UserMiddleware } from './user.middleware';

describe('UserMiddleware', () => {
  let module: TestingModule;
  let userService: UserService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [UserService],
    }).compile();
    userService = module.get<UserService>(UserService);
  });
  it('should be defined', () => {
    const mdware = new UserMiddleware(userService);
    expect(mdware).toBeDefined();
  });
});
