import { ObjectSchema } from 'joi';
import { ITaskValidator } from '../../domains/application/validators';
import { ITaskSchema } from '../../domains/data/schemas/task';
import BaseValidator from './BaseValidator';

class TaskValidator extends BaseValidator<ITaskSchema> implements ITaskValidator {
  constructor(
    public createSchema: ObjectSchema<Omit<ITaskSchema, 'userId'>>,
    public updateSchema: ObjectSchema<Partial<ITaskSchema>>,
  ) {
    super(createSchema, updateSchema);
  }
}

export default TaskValidator;
