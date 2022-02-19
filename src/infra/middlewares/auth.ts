import { RequestHandler } from 'express';
import { ITokenService, IUserService } from '../../domains/application/service';
import { IUserWithId } from '../../domains/data/schemas/user';

type UserPayloadType = Omit<IUserWithId, 'createdAt' | 'updatedAt' | 'password'>;

const auth = (
  tokenService: ITokenService,
  userService: IUserService,
): RequestHandler => async (req, _res, next): Promise<void> => {
  const { token } = req.cookies;
  try {
    const user = tokenService.validate(token) as UserPayloadType;
    await userService.findById(user.id);
    req.user = user;
  } catch (e) {
    next(e);
  }
  next();
};

export default auth;
