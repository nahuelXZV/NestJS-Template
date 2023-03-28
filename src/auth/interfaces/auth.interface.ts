import { ROLES } from "src/constants";

export interface PayloadI {
    sub: string;
    role: ROLES;
}

export interface AuthI {
    username: string;
    password: string;
}

export interface AuthTokenResult {
    role: string;
    sub: string;
    iat: number;
    exp: number;
}

export interface IUseToken {
    role: string;
    sub: string;
    isExpired: boolean;
}