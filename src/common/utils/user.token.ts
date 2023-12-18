import * as jwt from 'jsonwebtoken';

import { AuthTokenResult } from 'src/auth/interfaces/auth.interface';
import { IUserToken } from 'src/auth/interfaces/userToken.interface';

export const userToken = (token: string): IUserToken | string => {
  try {
    const decode = jwt.decode(token) as AuthTokenResult;
    const currentDate = new Date();
    const expiresDate = new Date(decode.exp);
    const isExpired = +expiresDate <= +currentDate / 1000;
    return {
      role: decode.role,
      sub: decode.sub,
      isExpired,
    };
  } catch (error) {
    return 'Token no valido.';
  }
};
