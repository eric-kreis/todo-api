import { ValidationResult } from 'joi';
import { IUserSchema } from '../../data/schemas/user';

interface IUserValidator {
  create(user: Omit<IUserSchema, 'role'>): ValidationResult<
  Omit<IUserSchema, 'role'>>;

  update(payload: Partial<IUserSchema>): ValidationResult<
  Partial<IUserSchema>>;

  signin(credentials: Pick<IUserSchema, 'email' | 'password'>): ValidationResult<
  Pick<IUserSchema, 'email' | 'password'>>;
}

export default IUserValidator;
