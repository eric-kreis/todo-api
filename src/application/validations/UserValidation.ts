import Joi, { ObjectSchema } from 'joi';
import IUserValidation from '../../domains/application/validation/IUserValidation';
import { IUserSchema } from '../../domains/data/schemas/user';

class UserValidation implements IUserValidation {
  private createSchema: ObjectSchema<IUserSchema>;

  private updateSchema: ObjectSchema<IUserSchema>;

  private signinSchema: ObjectSchema<IUserSchema>;

  constructor() {
    this.createSchema = Joi.object<IUserSchema>({
      name: Joi.string().max(10).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    this.updateSchema = Joi.object<IUserSchema>({
      name: Joi.string().max(10),
      email: Joi.string().email(),
    });

    this.signinSchema = Joi.object<IUserSchema>({
      name: Joi.string().max(10),
      email: Joi.string().email(),
    });
  }

  public create(user: IUserSchema) {
    return this.createSchema.validate(user);
  }

  public update(payload: Partial<IUserSchema>) {
    return this.updateSchema.validate(payload);
  }

  public signin(credentials: Pick<IUserSchema, 'email' | 'password'>) {
    return this.signinSchema.validate(credentials);
  }
}

export default UserValidation;
