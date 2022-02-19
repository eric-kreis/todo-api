import { ObjectSchema } from 'joi';
import { IUserValidator } from '../../interfaces/application/validators';
import { IUserSchema } from '../../interfaces/data/schemas/user';
import BaseValidator from './BaseValidator';

class UserValidator extends BaseValidator<IUserSchema> implements IUserValidator {
  constructor(
    public createSchema: ObjectSchema<Omit<IUserSchema, 'role'>>,
    public updateSchema: ObjectSchema<Partial<IUserSchema>>,
    public signinSchema: ObjectSchema<Pick<IUserSchema, 'email' | 'password'>>,
  ) {
    super(createSchema, updateSchema);
  }

  public create(user: Omit<IUserSchema, 'role'>) {
    return super.create(user);
  }

  public update(payload: Partial<IUserSchema>) {
    return super.update(payload);
  }

  public signin(credentials: Pick<IUserSchema, 'email' | 'password'>) {
    return this.signinSchema.validate(credentials);
  }
}

export default UserValidator;
