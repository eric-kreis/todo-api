import { ObjectSchema } from 'joi';
import { IUserValidator } from '../../domains/application/validators';
import { IUserSchema } from '../../domains/data/schemas/user';

class UserValidator implements IUserValidator {
  constructor(
    public createSchema: ObjectSchema<Omit<IUserSchema, 'role'>>,
    public updateSchema: ObjectSchema<Partial<IUserSchema>>,
    public signinSchema: ObjectSchema<Pick<IUserSchema, 'email' | 'password'>>,
  ) {}

  public create(user: Omit<IUserSchema, 'role'>) {
    return this.createSchema.validate(user);
  }

  public update(payload: Partial<IUserSchema>) {
    return this.updateSchema.validate(payload);
  }

  public signin(credentials: Pick<IUserSchema, 'email' | 'password'>) {
    return this.signinSchema.validate(credentials);
  }
}

export default UserValidator;
