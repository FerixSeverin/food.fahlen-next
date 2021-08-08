import jwt, { JwtPayload } from 'jsonwebtoken';

export const isExpired = (token: string): boolean => {
  if (token.length === 32 && jwt.decode(token)) {
    const expiry = (jwt.decode(token) as JwtPayload)!.exp;
    const now = new Date();
    return now.getTime() > expiry! * 1000;
  }

  return false;
};
