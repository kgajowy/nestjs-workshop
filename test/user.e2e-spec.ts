import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserLoginRequestDto, UserLoginResponseDto, UserRegisterDto, UserRegisterResponseDto } from '../src/user/dto';

const baseUrl = '/user';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`${baseUrl} (POST)`, () => {
    const reqBody: UserRegisterDto = {
      email: 'kamil.gajowy@gmail.com',
      name: 'kamil',
      password: 'asdf',
    };
    const expectedResponse: UserRegisterResponseDto = {
      id: expect.any(Number),
      name: reqBody.name,
      email: reqBody.email,
    };
    return request(app.getHttpServer())
      .post(baseUrl)
      .send(reqBody)
      .expect(201)
      .then(r => {
        expect(r.body).toMatchObject(expectedResponse);
      });
  });
  it('/user/login SUCCESS', () => {
    const req: UserLoginRequestDto = {
      email: 'kamil.gajowy@gmail.com',
      password: '123',
    };
    const resBody: UserLoginResponseDto = {
      token: expect.any(String),
      user: {
        id: expect.any(Number),
        name: 'kamil',
        email: 'kamil.gajowy@gmail.com',
      },
    };
    return request(app.getHttpServer())
      .post('/user/login')
      .send(req)
      .expect(201)
      .then(res => {
        expect(res.body).toMatchObject(resBody);
      });
  });

  it('/user/login ERROR', () => {
    const req: UserLoginRequestDto = {
      email: 'kamil.gajowy@gmail.com',
      password: '0004',
    };

    return request(app.getHttpServer())
      .post('/user/login')
      .send(req)
      .expect(422);
  });
});
