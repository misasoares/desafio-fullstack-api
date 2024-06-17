export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  emblems: any[];
  iat?: number;
  exp?: number;
}
