import * as request from 'supertest';
import { INestApplication, Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../../src/users/users.module';
import { DataSourceConfig } from '../config/data.source';
import { AuthModule } from '../../src/auth/auth.module';

describe('Users', () => {
    const logger = new Logger('TestUsers');
    let app: INestApplication;
    let token: string;

    // beforeAll(async () => {
    //     const moduleFixture: TestingModule = await Test.createTestingModule({
    //         imports: [
    //             ConfigModule.forRoot({
    //                 isGlobal: true,
    //                 envFilePath: '.env.test',
    //             }),
    //             TypeOrmModule.forRoot({ ...DataSourceConfig }),
    //             UsersModule,
    //             AuthModule,
    //         ],
    //     }).compile();

    //     app = moduleFixture.createNestApplication();
    //     await app.init();

    //     // Login
    //     const { body } = await request(app.getHttpServer())
    //         .post('/login')
    //         .send({
    //             email: 'nahuel@live.com',
    //             password: '123456789',
    //         });
    //     token = body.accessToken;
    //     logger.error(`Token: ${token}`);
    // })

    // it('/user (GET)', () => {
    //     return request(app.getHttpServer())
    //         .get('/user')
    //         .set('Authorization', `Bearer ${token}`)
    //         .expect(200)
    //         .expect('Content-Type', /json/)
    // });


    // afterAll(async () => {
    //     await app.close();
    // });


});






