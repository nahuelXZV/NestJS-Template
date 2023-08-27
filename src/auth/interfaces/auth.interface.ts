export interface AuthI {
  email: string;
  password: string;
}

export interface AuthTokenResult {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}
