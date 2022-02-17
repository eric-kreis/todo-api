import { TaskValidator } from '../../../src/application/validators';
import taskSchemas from '../../../src/application/joiSchemas/task';
import { ITaskSchema } from '../../../src/domains/data/schemas/task';
import joiErrorFactory from '../../joiErrorFactory';

// System Under Testing factory;
const sutFactory = () => {
  const sut = new TaskValidator(taskSchemas.create, taskSchemas.update);
  return { sut };
};

const joiMessage = 'text is required';

describe('TaskValidator.create', () => {
  it('should call TaskValidator.createSchema.validate', async () => {
    const { sut } = sutFactory();
    sut.createSchema.validate = jest.fn();

    sut.create({} as ITaskSchema);
    expect(sut.createSchema.validate).toHaveBeenCalled();
    expect(sut.createSchema.validate).toHaveBeenCalledTimes(1);
  });

  it('should return TaskValidator.createSchema.validate message', async () => {
    const { sut } = sutFactory();
    sut.createSchema.validate = jest.fn(() => joiErrorFactory(joiMessage));

    const response = sut.create({} as ITaskSchema);
    if (response.error) {
      expect(response.error.message).toBe(joiMessage);
    }
  });
});

describe('TaskValidator.update', () => {
  it('should call TaskValidator.updateSchema.validate', async () => {
    const { sut } = sutFactory();
    sut.updateSchema.validate = jest.fn();

    sut.update({} as ITaskSchema);
    expect(sut.updateSchema.validate).toHaveBeenCalled();
    expect(sut.updateSchema.validate).toHaveBeenCalledTimes(1);
  });

  it('should return TaskValidator.updateSchema.validate message', async () => {
    const { sut } = sutFactory();
    sut.updateSchema.validate = jest.fn(() => joiErrorFactory(joiMessage));

    const response = sut.update({} as ITaskSchema);
    if (response.error) {
      expect(response.error.message).toBe(joiMessage);
    }
  });
});
