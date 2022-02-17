import { UserModel } from '../../src/data/models';
import { UserRepository } from '../../src/entities/repositories';
import bodys from '../mocks/bodys';
import DataErrorStruct from '../../src/data/structs/DataErrorStruct';

jest.mock('../../src/data/models');

const UserModelMock = UserModel as jest.Mock<UserModel>;

// System Under Testing factory;
const sutFactory = () => {
  const userModelMock = new UserModelMock() as jest.Mocked<UserModel>;
  const sut = new UserRepository(userModelMock);

  return { sut, userModelMock };
};

describe('UserRepository.create', () => {
  it('should throw an error with correct message and code if model.findByEmail returns a user', async () => {
    const { sut, userModelMock } = sutFactory();
    userModelMock.findByEmail.mockResolvedValueOnce(bodys.user.response);

    let error: any;

    try {
      await sut.create(bodys.user.create);
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(DataErrorStruct);
    expect(error.message).toBe('user already registred');
    expect(error.code).toBe('CONFLICT');
  });

  it('should return the model.create if model.findByEmail returns null', async () => {
    const { sut, userModelMock } = sutFactory();
    userModelMock.findByEmail.mockResolvedValueOnce(null);
    userModelMock.create.mockResolvedValueOnce(bodys.user.response);

    let response: any;

    try {
      response = await sut.create(bodys.user.create);
    } catch (e) {
      response = e;
    }

    expect(response).toBe(bodys.user.response);
  });
});

describe('UserRepository.find', () => {
  it('should return the return of model.find', async () => {
    const { sut, userModelMock } = sutFactory();
    userModelMock.find.mockResolvedValue([bodys.user.response]);

    let response: any;

    try {
      response = await sut.find();
    } catch (e) {
      response = e;
    }

    expect(response).toStrictEqual([bodys.user.response]);
  });
});

describe('UserRepository.findById', () => {
  it('should throw an error if model.findById returns null', async () => {
    const { sut, userModelMock } = sutFactory();
    userModelMock.findById.mockResolvedValueOnce(null);

    let error: any;

    try {
      error = await sut.findById('id');
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(DataErrorStruct);
    expect(error.message).toBe('user not found');
    expect(error.code).toBe('NOT_FOUND');
  });

  it('should return the return of model.findById', async () => {
    const { sut, userModelMock } = sutFactory();
    userModelMock.findById.mockResolvedValueOnce(bodys.user.response);

    let response: any;

    try {
      response = await sut.findById('id');
    } catch (e) {
      response = e;
    }

    expect(response).toStrictEqual(bodys.user.response);
  });
});

describe('UserRepository.findByCredentials', () => {
  it('should throw an error if model.findByCredentials returns null', async () => {
    const { sut, userModelMock } = sutFactory();
    userModelMock.findByCredentials.mockResolvedValueOnce(null);

    let error: any;

    try {
      error = await sut.findByCredentials('invali.email', 'password');
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(DataErrorStruct);
    expect(error.message).toBe('user not found');
    expect(error.code).toBe('NOT_FOUND');
  });

  it('should return the return of model.findByCredentials if it\'s not null', async () => {
    const { sut, userModelMock } = sutFactory();
    userModelMock.findByCredentials.mockResolvedValueOnce(bodys.user.response);

    let response: any;

    try {
      response = await sut.findByCredentials('valid@email.com', 'password');
    } catch (e) {
      response = e;
    }

    expect(response).toStrictEqual(bodys.user.response);
  });
});

describe('UserRepository.update', () => {
  it('should throw an error if payload exists and model.findByEmail doesn\'t return null', async () => {
    const { sut, userModelMock } = sutFactory();
    userModelMock.findByEmail.mockResolvedValueOnce(bodys.user.response);

    let error: any;

    try {
      error = await sut.update('id', bodys.user.create);
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(DataErrorStruct);
    expect(error.message).toBe('user already registred');
    expect(error.code).toBe('CONFLICT');
  });

  it('should throw an error if payload exists and model.update returns null', async () => {
    const { sut, userModelMock } = sutFactory();
    userModelMock.findByCredentials.mockResolvedValueOnce(null);
    userModelMock.update.mockResolvedValueOnce(null);

    let error: any;

    try {
      error = await sut.update('id', bodys.user.create);
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(DataErrorStruct);
    expect(error.message).toBe('user not found');
    expect(error.code).toBe('NOT_FOUND');
  });

  it('should return the return of model.update if it\'s not null', async () => {
    const { sut, userModelMock } = sutFactory();
    userModelMock.findByCredentials.mockResolvedValueOnce(null);
    userModelMock.update.mockResolvedValueOnce(bodys.user.response);

    let response: any;

    try {
      response = await sut.update('id', bodys.user.create);
    } catch (e) {
      response = e;
    }

    expect(response).toStrictEqual(bodys.user.response);
  });
});

describe('UserRepository.delete', () => {
  it('should throw an error if payload exists and model.delete returns null', async () => {
    const { sut, userModelMock } = sutFactory();
    userModelMock.delete.mockResolvedValueOnce(null);

    let error: any;

    try {
      error = await sut.delete('id');
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(DataErrorStruct);
    expect(error.message).toBe('user not found');
    expect(error.code).toBe('NOT_FOUND');
  });

  it('should return the return of model.delete if it\'s not null', async () => {
    const { sut, userModelMock } = sutFactory();
    userModelMock.delete.mockResolvedValueOnce(bodys.user.response);

    let response: any;

    try {
      response = await sut.delete('id');
    } catch (e) {
      response = e;
    }

    expect(response).toStrictEqual(bodys.user.response);
  });
});
