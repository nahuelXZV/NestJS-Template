import { SetMetadata } from '@nestjs/common';
import { ADMIN_KEY, ROLES } from '../../common/constants';

export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLES.ADMIN);
