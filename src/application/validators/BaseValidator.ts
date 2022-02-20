import { ObjectSchema } from 'joi';
import { IValidator } from '../../interfaces/application/validators';

abstract class BaseValidator<TDocSchema> implements IValidator<TDocSchema> {
  constructor(
    public readonly createSchema: ObjectSchema<Partial<TDocSchema>>,
    public readonly updateSchema: ObjectSchema<Partial<TDocSchema>>,
  ) {}

  public create(payload: Partial<TDocSchema>) {
    return this.createSchema.validate(payload);
  }

  public update(payload: Partial<TDocSchema>) {
    return this.updateSchema.validate(payload);
  }
}

export default BaseValidator;
