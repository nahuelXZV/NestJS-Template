import * as jwt from 'jsonwebtoken';
import { AuthTokenResult, IUseToken } from "src/auth/interfaces/auth.interface";

export const useToken = (token: string): IUseToken | string => {
    try {
        const decode = jwt.decode(token) as AuthTokenResult;
        const currentDate = new Date();
        const expiresDate = new Date(decode.exp);
        const isExpired = +expiresDate <= +currentDate / 1000;
        return {
            role: decode.role,
            sub: decode.sub,
            isExpired
        }
    } catch (error) {
        return 'Token is not valid'
    }
}