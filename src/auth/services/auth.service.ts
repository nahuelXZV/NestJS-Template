import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersEntity } from 'src/users/entities/users.entity';
import { PayloadI } from '../interfaces/auth.interface';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    public async validateUser(username: string, password: string): Promise<any> {
        const userByUserName = await this.usersService.findBy({ key: 'username', value: username });
        const userByEmail = await this.usersService.findBy({ key: 'email', value: username });
        const user = userByUserName || userByEmail;
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
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

    public async recoverPassword(username: string): Promise<any> {
        const userByUserName = await this.usersService.findBy({ key: 'username', value: username });
        const userByEmail = await this.usersService.findBy({ key: 'email', value: username });
        const user = userByUserName || userByEmail;
        if (!user) {
            throw new NotFoundError('User not found');
        }
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

