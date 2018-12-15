import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserRegisterDto, UserRegisterResponseDto } from '../src/user/dto';

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
});
