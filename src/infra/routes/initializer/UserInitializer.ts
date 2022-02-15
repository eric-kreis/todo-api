import { Router } from 'express';
import { Db } from 'mongodb';
import { UserRouter } from '../routers';
import { UserModel } from '../../../data/models';
import { UserRepository } from '../../../entities/repositories';
import { UserValidator } from '../../../application/validators';
import { TokenService, UserService } from '../../../application/services';
import { UserController } from '../../controllers';
import decrypt from '../../../helpers/decrypt';
import encrypt from '../../../helpers/encrypt';

class UserInitializer {
  public readonly router: Router;

  constructor(db: Db) {
    const userModel = new UserModel(db, encrypt, decrypt);
    const userRepository = new UserRepository(userModel);
    const userValidator = new UserValidator();
    const userService = new UserService(userRepository, userValidator);
    const tokenService = new TokenService();
    const userController = new UserController(userService, tokenService);
    const { router } = new UserRouter(userController);

    this.router = router;
  }
}

export default UserInitializer;
