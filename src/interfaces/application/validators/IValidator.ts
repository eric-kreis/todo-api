import { ValidationResult } from 'joi';

interface IValidator<TDocSchema> {
  create(doc: Partial<TDocSchema>): ValidationResult<Partial<TDocSchema>>;

  update(payload: Partial<TDocSchema>): ValidationResult<Partial<TDocSchema>>;
}

export default IValidator;
