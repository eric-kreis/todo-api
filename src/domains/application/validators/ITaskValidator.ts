import { ValidationResult } from 'joi';
import { ITaskSchema } from '../../data/schemas/task';

interface IUserValidator {
  create(user: Omit<ITaskSchema, 'userId'>): ValidationResult<
  Partial<ITaskSchema>>;

  update(payload: Partial<ITaskSchema>): ValidationResult<
  Partial<ITaskSchema>>;
}

export default IUserValidator;
