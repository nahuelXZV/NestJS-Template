import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { PUBLIC_KEY } from 'src/constants';
import { UsersService } from 'src/users/services/users.service';
import { useToken } from 'src/utils/use.token';
import { IUseToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly reflector: Reflector,

  ) { }
  async canActivate(
    context: ExecutionContext,
  ) {
    try {
      const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler());
      if (isPublic) return true;
      const request = context.switchToHttp().getRequest<Request>();
      const token = request.headers.authorization?.split(' ')[1];
      if (!token || Array.isArray(token)) throw new UnauthorizedException('Token no encontrado');
      const managerToken: IUseToken | string = useToken(token);
      if (typeof managerToken === 'string') throw new UnauthorizedException(managerToken);
      if (managerToken.isExpired) throw new UnauthorizedException('Token expirado');
      const user = await this.userService.findOneAuth(managerToken.sub);
      request.idUser = user.id;
      request.roleUser = user.role;
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Error al validar el token');
    }
  }
}
