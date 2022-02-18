import { RequestHandler } from 'express';
import { TokenService } from '../../application/services';
import { IUserSchema } from '../../domains/data/schemas/user';

type UserPayloadType = Omit<IUserSchema, 'createdAt' | 'updatedAt' | 'password'> & { id: string };

const auth: RequestHandler = (req, _res, next) => {
  const { token } = req.cookies;
  const tokenService = new TokenService();
  try {
    req.user = tokenService.validate(token) as UserPayloadType;
  } catch (e) {
    next(e);
  }

  next();
};

export default auth;
