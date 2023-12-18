import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from 'src/common/constants';

export const PublicAccess = () => SetMetadata(PUBLIC_KEY, true);
