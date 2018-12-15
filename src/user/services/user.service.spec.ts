import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();
    service = module.get<UserService>(UserService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('token generation', () => {
    const payload = {
      user: {
        id: 1,
        name: 'piotr',
        email: 'piotr@myflow.pl',
        password: 'ups',
      },
    };
    const token = service.tokenSign(payload);
    expect(typeof token).toBe('string');
    expect(service.tokenDecode(token)).toMatchObject(payload);
  });
});
