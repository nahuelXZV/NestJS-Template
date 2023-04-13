import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common/exceptions';
import * as jwt from 'jsonwebtoken';

import { UsersEntity } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/services/users.service';
import { PayloadI } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    public async validateUser(email: string, password: string): Promise<any> {
        try {
            const user = await this.usersService.findBy({ key: 'email', value: email });
            if (!user || !await bcrypt.compare(password, user.password)) throw new NotFoundException('Usuario o contraseña incorrectos');
            return this.generateJWT(user);
        } catch (error) {
            throw new InternalServerErrorException('Error al validar el usuario.');
        }
    }


    public singJWT({ payload, secret, expiresIn }: { payload: jwt.JwtPayload, secret: string, expiresIn: number | string }) {
        return jwt.sign(payload, secret, { expiresIn });
    }

    public async generateJWT(user: UsersEntity): Promise<any> {
        const getUser = await this.usersService.findOne(user.id);
        const payload: PayloadI = {
            sub: getUser.id,
            role: getUser.role
        };
        const accessToken = this.singJWT({ payload, secret: process.env.JWT_AUTH, expiresIn: '7d' });
        return {
            accessToken,
            User: getUser
        };
    }

    public async recoverPassword(email: string): Promise<any> {
        const user = await this.usersService.findBy({ key: 'email', value: email });
        const payload: PayloadI = {
            sub: user.id,
            role: user.role
        }
        const accessToken = this.singJWT({ payload, secret: process.env.JWT_RECOVERY, expiresIn: '1h' });
        return {
            accessToken
        };
    }


}

