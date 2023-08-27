import { Injectable } from '@nestjs/common';
import { InternalServerErrorException, NotFoundException, } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { UsersEntity } from 'src/users/entities/users.entity';
import { UserService } from 'src/users/services/users.service';
import { IPayload } from '../interfaces/payload.interface';
import { ConfigService } from '@nestjs/config';
import { userToken } from 'src/common/utils/user.token';
import { IUserToken } from '../interfaces/userToken.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) { }

  public async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findOneBy({ key: 'email', value: email, });
      if (!user || !(await bcrypt.compare(password, user.password))) throw new NotFoundException('Usuario o contraseña incorrectos');
      return this.generateJWT(user);
    } catch (error) {
      throw new InternalServerErrorException('Error al validar el usuario.');
    }
  }

  public singJWT({ payload, secret, expiresIn, }: { payload: jwt.JwtPayload; secret: string; expiresIn: number | string; }) {
    return jwt.sign(payload, secret, { expiresIn });
  }

  public async generateJWT(user: UsersEntity): Promise<any> {
    const getUser: UsersEntity = await this.userService.findOne(user.id);
    const payload: IPayload = {
      sub: getUser.id,
      role: getUser.role,
    };
    const accessToken = this.singJWT({
      payload,
      secret: this.configService.get('JWT_AUTH'),
      expiresIn: '1d',
    });
    return {
      accessToken,
      User: getUser,
    };
  }

  public async recoverPassword(email: string): Promise<any> {
    const user = await this.userService.findOneBy({ key: 'email', value: email, });
    const payload: IPayload = {
      sub: user.id,
      role: user.role,
    };
    const accessToken = this.singJWT({
      payload,
      secret: this.configService.get('JWT_AUTH'),
      expiresIn: '1h',
    });
    return {
      accessToken,
    };
  }

  async checkToken(tokenUser: string) {
    try {
      const managerToken: IUserToken | string = userToken(tokenUser);
      if (typeof managerToken === 'string') return false;
      if (managerToken.isExpired) return false;
      const user = await this.userService.findOneAuth(managerToken.sub);
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error al validar el token.');
    }
  }
}
