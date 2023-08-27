import { ROLES } from 'src/constants';

export interface IPayload {
  sub: string;
  role: ROLES;
}
