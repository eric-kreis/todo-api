import { TaskModel } from '../../../src/data/models';
import DataErrorStruct from '../../../src/data/structs/DataErrorStruct';
import { TaskRepository } from '../../../src/entities/repositories';
import bodys from '../../mocks/bodys';

jest.mock('../../../src/data/models');

const TaskModelMock = TaskModel as jest.Mock<TaskModel>;

const sutFactory = () => {
  const taskModelMock = new TaskModelMock() as jest.Mocked<TaskModel>;
  const sut = new TaskRepository(taskModelMock);

  return { sut, taskModelMock };
};

describe('TaskRepository.create', () => {
  it('should return model.create', async () => {
    const { sut, taskModelMock } = sutFactory();
    taskModelMock.create.mockResolvedValueOnce(bodys.task1.response);
    let response: any;

    try {
      response = await sut.create(bodys.task1.response);
    } catch (e) {
      response = e;
    }

    expect(taskModelMock.create).toHaveBeenCalled();
    expect(taskModelMock.create).toHaveBeenCalledTimes(1);
    expect(response).toBe(bodys.task1.response);
  });
});

describe('TaskRepository.find', () => {
  it('should return the return of model.find', async () => {
    const { sut, taskModelMock } = sutFactory();
    taskModelMock.find.mockResolvedValueOnce([bodys.task1.response]);
    let response: any;

    try {
      response = await sut.find();
    } catch (e) {
      response = e;
    }

    expect(taskModelMock.find).toHaveBeenCalled();
    expect(taskModelMock.find).toHaveBeenCalledTimes(1);
    expect(response).toStrictEqual([bodys.task1.response]);
  });
});

describe('TaskRepository.findAllByUser', () => {
  it('should return the return of model.find', async () => {
    const { sut, taskModelMock } = sutFactory();
    taskModelMock.findAllByUser.mockResolvedValueOnce([bodys.task1.response]);
    let response: any;

    try {
      response = await sut.findAllByUser('userId');
    } catch (e) {
      response = e;
    }

    expect(taskModelMock.findAllByUser).toHaveBeenCalledWith('userId');
    expect(taskModelMock.findAllByUser).toHaveBeenCalled();
    expect(taskModelMock.findAllByUser).toHaveBeenCalledTimes(1);
    expect(response).toStrictEqual([bodys.task1.response]);
  });
});

describe('TaskRepository.findById', () => {
  it('should throw an error if model.findById returns null', async () => {
    const { sut, taskModelMock } = sutFactory();
    taskModelMock.findById.mockResolvedValueOnce(null);

    let error: any;

    try {
      error = await sut.findById('id');
    } catch (e) {
      error = e;
    }

    expect(taskModelMock.findById).toHaveBeenCalled();
    expect(taskModelMock.findById).toHaveBeenCalledTimes(1);
    expect(error).toBeInstanceOf(DataErrorStruct);
    expect(error.message).toBe('task not found');
    expect(error.code).toBe('NOT_FOUND');
  });

  it('should return the return of model.findById', async () => {
    const { sut, taskModelMock } = sutFactory();
    taskModelMock.findById.mockResolvedValueOnce(bodys.task1.response);

    let response: any;

    try {
      response = await sut.findById('id');
    } catch (e) {
      response = e;
    }

    expect(taskModelMock.findById).toHaveBeenCalled();
    expect(taskModelMock.findById).toHaveBeenCalledTimes(1);
    expect(response).toStrictEqual(bodys.task1.response);
  });
});

describe('TaskRepository.update', () => {
  it('should throw an error if model.update returns null', async () => {
    const { sut, taskModelMock } = sutFactory();
    taskModelMock.update.mockResolvedValueOnce(null);

    let error: any;

    try {
      error = await sut.update('id', { text: 'new Text' });
    } catch (e) {
      error = e;
    }

    expect(taskModelMock.update).toHaveBeenCalledWith('id', { text: 'new Text' });
    expect(taskModelMock.update).toHaveBeenCalled();
    expect(taskModelMock.update).toHaveBeenCalledTimes(1);
    expect(error).toBeInstanceOf(DataErrorStruct);
    expect(error.message).toBe('task not found');
    expect(error.code).toBe('NOT_FOUND');
  });

  it('should return the return of model.update', async () => {
    const { sut, taskModelMock } = sutFactory();
    taskModelMock.update.mockResolvedValueOnce({ ...bodys.task1.response, text: 'new Text' });

    let response: any;

    try {
      response = await sut.update('id', { text: 'new Text' });
    } catch (e) {
      response = e;
    }

    expect(taskModelMock.update).toHaveBeenCalledWith('id', { text: 'new Text' });
    expect(taskModelMock.update).toHaveBeenCalled();
    expect(taskModelMock.update).toHaveBeenCalledTimes(1);
    expect(response).toStrictEqual({ ...bodys.task1.response, text: 'new Text' });
  });
});

describe('TaskRepository.delete', () => {
  it('should throw an error if model.delete returns null', async () => {
    const { sut, taskModelMock } = sutFactory();
    taskModelMock.delete.mockResolvedValueOnce(null);

    let error: any;

    try {
      error = await sut.delete('id');
    } catch (e) {
      error = e;
    }

    expect(taskModelMock.delete).toHaveBeenCalledWith('id');
    expect(taskModelMock.delete).toHaveBeenCalled();
    expect(taskModelMock.delete).toHaveBeenCalledTimes(1);
    expect(error).toBeInstanceOf(DataErrorStruct);
    expect(error.message).toBe('task not found');
    expect(error.code).toBe('NOT_FOUND');
  });

  it('should return the return of model.delete', async () => {
    const { sut, taskModelMock } = sutFactory();
    taskModelMock.delete.mockResolvedValueOnce(bodys.task1.response);

    let response: any;

    try {
      response = await sut.delete('id');
    } catch (e) {
      response = e;
    }

    expect(taskModelMock.delete).toHaveBeenCalledWith('id');
    expect(taskModelMock.delete).toHaveBeenCalled();
    expect(taskModelMock.delete).toHaveBeenCalledTimes(1);
    expect(response).toStrictEqual(bodys.task1.response);
  });
});
