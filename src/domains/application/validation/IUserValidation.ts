import { ValidationResult } from 'joi';
import { IUserSchema } from '../../data/schemas/user';

interface IUserValidation {
  create(user: IUserSchema): ValidationResult<IUserSchema>;

  update(payload: Partial<IUserSchema>): ValidationResult<IUserSchema>;

  signin(credentials: Pick<IUserSchema, 'email' | 'password'>): ValidationResult<IUserSchema>;
}

export default IUserValidation;
