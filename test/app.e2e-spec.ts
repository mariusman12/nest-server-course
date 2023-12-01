import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from "../src/app/app.module"

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/auth/3')
      .expect(200)
      .expect({ id: 3, email: 'Dan2@yaoo.com' });
  });
  it('/signup (POST) success', () => {
    return request(app.getHttpServer( ))
      .post('/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'test123'
      })
      .expect(201)
      .expect(response => {
        expect(response.body.id).toBeDefined();
        expect(response.body.email).toEqual('test@test.com');
      });
  });
  it('/signup (POST) email already exists', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: 'existing_email@example.com',
        password: 'test123'
      })
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Adresa de email deja exista',
        error: 'Bad Request',
      });
  });
});
