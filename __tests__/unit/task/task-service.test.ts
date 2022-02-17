import { ValidationResult } from 'joi';
import { TaskService } from '../../../src/application/services';
import { TaskValidator } from '../../../src/application/validators';
import { ITaskSchema } from '../../../src/domains/data/schemas/task';
import { TaskRepository } from '../../../src/entities/repositories';
import RequestErrorBuilder from '../../../src/entities/builders/RequestErrorBuilder';
import joiErrorFactory from '../../joiErrorFactory';
import bodys from '../../mocks/bodys';

jest.mock('../../../src/application/validators');
jest.mock('../../../src/entities/repositories');

const UserRepositoryMock = TaskRepository as jest.Mock<TaskRepository>;
const TaskValidatorMock = TaskValidator as jest.Mock<TaskValidator>;

// System Under Testing factory;
const sutFactory = () => {
  const taskRepositoryMock = new UserRepositoryMock() as jest.Mocked<TaskRepository>;
  const taskValidatormock = new TaskValidatorMock() as jest.Mocked<TaskValidator>;
  const sut = new TaskService(taskRepositoryMock, taskValidatormock);

  return { sut, taskRepositoryMock, taskValidatormock };
};

describe('TaskService.create', () => {
  it('should throw an error with correct "message" and "status" if validator contains "error"', async () => {
    const errorMessage = 'validator message';
    const { sut, taskValidatormock } = sutFactory();
    taskValidatormock.create.mockReturnValueOnce(joiErrorFactory(errorMessage));

    let error: any;

    try {
      await sut.create({} as ITaskSchema);
    } catch (e) {
      error = e;
    }

    expect(taskValidatormock.create).toHaveBeenCalled();
    expect(taskValidatormock.create).toHaveBeenCalledTimes(1);
    expect(error).toBeInstanceOf(RequestErrorBuilder);
    expect(error.message).toBe(errorMessage);
    expect(error.status).toBe(400);
  });

  it('should return repository return if validator doesn\'t contain "error"', async () => {
    const { sut, taskValidatormock, taskRepositoryMock } = sutFactory();
    taskValidatormock.create.mockReturnValueOnce({} as ValidationResult);
    taskRepositoryMock.create.mockResolvedValueOnce(bodys.task1.response);

    let response: any;

    try {
      response = await sut.create({} as ITaskSchema);
    } catch (e) {
      response = e;
    }

    expect(taskValidatormock.create).toHaveBeenCalled();
    expect(taskValidatormock.create).toHaveBeenCalledTimes(1);
    expect(taskRepositoryMock.create).toHaveBeenCalled();
    expect(taskRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(response).toBe(bodys.task1.response);
  });
});

describe('TaskService.find', () => {
  it('should return repository return', async () => {
    const { sut, taskRepositoryMock } = sutFactory();
    taskRepositoryMock.find.mockResolvedValueOnce([bodys.task1.response]);

    let response: any;

    try {
      response = await sut.find();
    } catch (e) {
      response = e;
    }

    expect(taskRepositoryMock.find).toHaveBeenCalled();
    expect(taskRepositoryMock.find).toHaveBeenCalledTimes(1);
    expect(response).toStrictEqual([bodys.task1.response]);
  });
});

describe('TaskService.findAllByUser', () => {
  it('should return repository return', async () => {
    const { sut, taskRepositoryMock } = sutFactory();
    taskRepositoryMock.findAllByUser.mockResolvedValueOnce([bodys.task1.response]);

    let response: any;

    try {
      response = await sut.findAllByUser('userId');
    } catch (e) {
      response = e;
    }

    expect(taskRepositoryMock.findAllByUser).toHaveBeenCalled();
    expect(taskRepositoryMock.findAllByUser).toHaveBeenCalledTimes(1);
    expect(response).toStrictEqual([bodys.task1.response]);
  });
});

describe('TaskService.findById', () => {
  it('should return repository return', async () => {
    const { sut, taskRepositoryMock } = sutFactory();
    taskRepositoryMock.findById.mockResolvedValueOnce(bodys.task1.response);

    let response: any;

    try {
      response = await sut.findById('id');
    } catch (e) {
      response = e;
    }

    expect(taskRepositoryMock.findById).toHaveBeenCalled();
    expect(taskRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(response).toBe(bodys.task1.response);
  });
});

describe('TaskService.update', () => {
  it('should throw an error with correct "message" and "status" if validator contains "error"', async () => {
    const { sut, taskValidatormock } = sutFactory();
    const errorMessage = 'validator message';
    taskValidatormock.update.mockReturnValueOnce(joiErrorFactory(errorMessage));

    let error: any;

    try {
      await sut.update('id', {} as ITaskSchema);
    } catch (e) {
      error = e;
    }

    expect(taskValidatormock.update).toHaveBeenCalled();
    expect(taskValidatormock.update).toHaveBeenCalledTimes(1);
    expect(error).toBeInstanceOf(RequestErrorBuilder);
    expect(error.message).toBe(errorMessage);
    expect(error.status).toBe(400);
  });

  it('should return repository return if validator doesn\'t contain "error"', async () => {
    const { sut, taskValidatormock, taskRepositoryMock } = sutFactory();
    taskValidatormock.update.mockReturnValueOnce({} as ValidationResult);
    taskRepositoryMock.update.mockResolvedValueOnce(bodys.task1.response);

    let response: any;

    try {
      response = await sut.update('id', {} as Partial<ITaskSchema>);
    } catch (e) {
      response = e;
    }

    expect(taskRepositoryMock.update).toHaveBeenCalled();
    expect(taskRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(response).toBe(bodys.task1.response);
  });
});

describe('TaskService.delete', () => {
  it('should return repository return', async () => {
    const { sut, taskRepositoryMock } = sutFactory();
    taskRepositoryMock.delete.mockResolvedValueOnce(bodys.task1.response);

    let response: any;

    try {
      response = await sut.delete('id');
    } catch (e) {
      response = e;
    }

    expect(taskRepositoryMock.delete).toHaveBeenCalled();
    expect(taskRepositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(response).toBe(bodys.task1.response);
  });
});
