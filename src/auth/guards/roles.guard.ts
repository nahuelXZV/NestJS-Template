import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException, UnauthorizedException, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { ADMIN_KEY, ROLES, ROLES_KEY } from 'src/common/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const roles = this.reflector.get<Array<keyof typeof ROLES>>(ROLES_KEY, context.getHandler(),);
      const admin = this.reflector.get<Array<string>>(ADMIN_KEY, context.getHandler(),);
      const request = context.switchToHttp().getRequest<Request>();
      const { roleUser } = request;
      if (roles === undefined) {
        if (!admin) return true;
        if (admin && roleUser === ROLES.ADMIN) return true;
        throw new UnauthorizedException('No tienes permisos para acceder a esta ruta.',);
      }
      if (roleUser === ROLES.ADMIN) return true;
      const isAuthorized = roles.some((role) => roleUser === role);
      if (!isAuthorized)
        throw new UnauthorizedException('No tienes permisos para acceder a esta ruta.',);
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Error al validar los permisos');
    }
  }
}
