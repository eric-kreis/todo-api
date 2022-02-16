import Joi from 'joi';
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

const createSchema = Joi.object({
  name: Joi.string().max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const updateSchema = Joi.object({
  name: Joi.string().max(20),
  email: Joi.string().email(),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

class UserInitializer {
  public readonly router: Router;

  constructor(db: Db) {
    const userModel = new UserModel(db, encrypt, decrypt);
    const userRepository = new UserRepository(userModel);
    const userValidator = new UserValidator(createSchema, updateSchema, signinSchema);
    const userService = new UserService(userRepository, userValidator);
    const tokenService = new TokenService();
    const userController = new UserController(userService, tokenService);
    const { router } = new UserRouter(userController);

    this.router = router;
  }
}

export default UserInitializer;
