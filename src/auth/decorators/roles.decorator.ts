import { SetMetadata } from '@nestjs/common';
import { ROLES, ROLES_KEY } from 'src/constants';

export const RolesAccess = (...roles: Array<keyof typeof ROLES>) =>
  SetMetadata(ROLES_KEY, roles);
