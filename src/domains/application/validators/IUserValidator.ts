import { ValidationResult } from 'joi';
import { IUserSchema } from '../../data/schemas/user';

interface IUserValidator {
  create(user: IUserSchema): ValidationResult<IUserSchema>;

  update(payload: Partial<IUserSchema>): ValidationResult<IUserSchema>;

  signin(credentials: Pick<IUserSchema, 'email' | 'password'>): ValidationResult<IUserSchema>;
}

export default IUserValidator;
