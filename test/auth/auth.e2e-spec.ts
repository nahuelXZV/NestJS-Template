import * as request from 'supertest';
import { INestApplication, Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../../src/users/users.module';
import { DataSourceConfig } from '../config/data.source';
import { AuthModule } from '../../src/auth/auth.module';
import { ROLES } from '../../src/common/constants';

describe('Users', () => {
    const logger = new Logger('AuthTest');
    let app: INestApplication;
    let token: string;
    let user = {
        nombre: 'nahuel',
        apellido: 'zalazar',
        email: 'nahuel@live.com',
        role: ROLES.ADMIN,
        password: '123456789',
    };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: '.env.test',
                }),
                TypeOrmModule.forRoot({ ...DataSourceConfig }),
                UsersModule,
                AuthModule,
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    })

    test('Debe registrar usuarios', () => {
        return request(app.getHttpServer())
            .post('/register')
            .set('Authorization', `Bearer ${token}`)
            .send(user)
            .expect(201)
            .expect('Content-Type', /json/)
            .then(({ body }) => {
                body = JSON.parse(JSON.stringify(body));
                expect(body.data).toHaveProperty('nombre');
                expect(body.data).toHaveProperty('apellido');
                expect(body.data).toHaveProperty('email');
                expect(body.data).toHaveProperty('role');
                expect(body.data.nombre).toBe(user.nombre);
            });
    });

    test('Debe devolver el token', () => {
        return request(app.getHttpServer())
            .post('/login')
            .send({
                email: 'nahuel@live.com',
                password: '123456789',
            })
            .expect(201)
            .then(({ body }) => {
                body = JSON.parse(JSON.stringify(body));
                expect(body.data.accessToken).not.toBeNull()
            })
    });

    afterAll(async () => {
        await app.close();
    });


});






