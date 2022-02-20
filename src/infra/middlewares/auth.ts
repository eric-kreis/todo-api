import { RequestHandler } from 'express';
import { ITokenService } from '../../interfaces/application/service';
import { IUserWithId } from '../../interfaces/data/schemas/user';
import { IUserRepository } from '../../interfaces/entity/respository';

type UserPayloadType = Omit<IUserWithId, 'createdAt' | 'updatedAt' | 'password'>;

const auth = (
  tokenService: ITokenService,
  userRepository: IUserRepository,
): RequestHandler => async (req, _res, next): Promise<void> => {
  const { token } = req.cookies;
  try {
    const user = tokenService.validate(token) as UserPayloadType;
    const updatedUser = await userRepository.findById(user.id);
    req.user = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    };
  } catch (e) {
    next(e);
  }
  next();
};

export default auth;
