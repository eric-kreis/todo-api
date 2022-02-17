import { UserValidator } from '../../../src/application/validators';
import userSchemas from '../../../src/application/joiSchemas/user';
import { IUserSchema } from '../../../src/domains/data/schemas/user';
import joiErrorFactory from '../../joiErrorFactory';

// System Under Testing factory;
const sutFactory = () => {
  const sut = new UserValidator(userSchemas.create, userSchemas.update, userSchemas.signin);
  return { sut };
};

const joiMessage = 'name is required';

describe('UserValidator.create', () => {
  it('should call UserValidator.createSchema.validate', async () => {
    const { sut } = sutFactory();
    sut.createSchema.validate = jest.fn();

    sut.create({} as IUserSchema);
    expect(sut.createSchema.validate).toHaveBeenCalled();
    expect(sut.createSchema.validate).toHaveBeenCalledTimes(1);
  });

  it('should return UserValidator.createSchema.validate message', async () => {
    const { sut } = sutFactory();
    sut.createSchema.validate = jest.fn(() => joiErrorFactory(joiMessage));

    const response = sut.create({} as IUserSchema);
    if (response.error) {
      expect(response.error.message).toBe(joiMessage);
    }
  });
});

describe('UserValidator.update', () => {
  it('should call UserValidator.updateSchema.validate', async () => {
    const { sut } = sutFactory();
    sut.updateSchema.validate = jest.fn();

    sut.update({} as IUserSchema);
    expect(sut.updateSchema.validate).toHaveBeenCalled();
    expect(sut.updateSchema.validate).toHaveBeenCalledTimes(1);
  });

  it('should return UserValidator.updateSchema.validate message', async () => {
    const { sut } = sutFactory();
    sut.updateSchema.validate = jest.fn(() => joiErrorFactory(joiMessage));

    const response = sut.update({} as IUserSchema);
    if (response.error) {
      expect(response.error.message).toBe(joiMessage);
    }
  });
});

describe('UserValidator.signin', () => {
  it('should call UserValidator.signinSchema.validate', async () => {
    const { sut } = sutFactory();
    sut.signinSchema.validate = jest.fn();

    sut.signin({} as IUserSchema);
    expect(sut.signinSchema.validate).toHaveBeenCalled();
    expect(sut.signinSchema.validate).toHaveBeenCalledTimes(1);
  });

  it('should return UserValidator.signinSchema.validate message', async () => {
    const { sut } = sutFactory();
    sut.signinSchema.validate = jest.fn(() => joiErrorFactory(joiMessage));

    const response = sut.signin({} as IUserSchema);
    if (response.error) {
      expect(response.error.message).toBe(joiMessage);
    }
  });
});
