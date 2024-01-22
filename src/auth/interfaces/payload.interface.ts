import { ROLES } from '../../common/constants';

export interface IPayload {
  sub: string;
  role: ROLES;
}
