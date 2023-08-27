import { SetMetadata } from '@nestjs/common';
import { ADMIN_KEY, ROLES } from 'src/constants';

export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLES.ADMIN);
