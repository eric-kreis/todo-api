import { ValidationResult } from 'joi';
import { UserService } from '../../src/application/services';
import { UserValidator } from '../../src/application/validators';
import { IUserSchema, IUserWithId } from '../../src/domains/data/schemas/user';
import RequestErrorBuilder from '../../src/entities/builders/RequestErrorBuilder';
import { UserRepository } from '../../src/entities/repositories';
import joiErrorFactory from '../joiErrorFactory';
import bodys from '../bodys';

jest.mock('../../src/application/validators');
jest.mock('../../src/entities/repositories');

const UserRepositoryMock = UserRepository as jest.Mock<UserRepository>;
const UserValidatorMock = UserValidator as jest.Mock<UserValidator>;

// System Under Testing factory;
const sutFactory = () => {
  const userRepositoryMock = new UserRepositoryMock() as jest.Mocked<UserRepository>;
  const userValidatorMock = new UserValidatorMock() as jest.Mocked<UserValidator>;
  const sut = new UserService(userRepositoryMock, userValidatorMock);

  return {
    sut,
    userRepositoryMock,
    userValidatorMock,
  };
};

describe('UserService.create', () => {
  it('should throw an error with correct "message" and "status" if validator contains "error"', async () => {
    const { sut, userValidatorMock } = sutFactory();
    const errorMessage = 'validator message';
    userValidatorMock.create.mockReturnValueOnce(joiErrorFactory(errorMessage));

    let error: any;

    try {
      await sut.create({} as IUserSchema);
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(RequestErrorBuilder);
    expect(error.message).toBe(errorMessage);
    expect(error.status).toBe(400);
  });

  it('should return repository return if validator dont contains "error"', async () => {
    const { sut, userValidatorMock, userRepositoryMock } = sutFactory();
    const repositoryResponse = bodys.user;
    userValidatorMock.create.mockReturnValueOnce({} as ValidationResult);
    userRepositoryMock.create.mockResolvedValueOnce(
      Promise.resolve(repositoryResponse as unknown as IUserWithId),
    );

    let response: any;

    try {
      response = await sut.create({} as IUserSchema);
    } catch (e) {
      response = e;
    }

    expect(response).toBe(repositoryResponse);
  });
});
