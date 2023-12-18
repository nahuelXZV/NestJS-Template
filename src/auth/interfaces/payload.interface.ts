import { ROLES } from 'src/common/constants';

export interface IPayload {
  sub: string;
  role: ROLES;
}
