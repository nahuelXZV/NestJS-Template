import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException, UnauthorizedException, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { UserService } from 'src/users/services/users.service';
import { userToken } from 'src/common/utils/user.token';
import { IUserToken } from '../interfaces/userToken.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) { }
  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest<Request>();
      const token = request.headers.authorization?.split(' ')[1];
      if (!token || Array.isArray(token))
        throw new UnauthorizedException('Token no encontrado');
      const managerToken: IUserToken | string = userToken(token);
      if (typeof managerToken === 'string')
        throw new UnauthorizedException(managerToken);
      if (managerToken.isExpired)
        throw new UnauthorizedException('Token expirado');
      const user = await this.userService.findOneAuth(managerToken.sub);
      request.idUser = user.id;
      request.roleUser = user.role;
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Error al validar el token');
    }
  }
}
