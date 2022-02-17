import { TaskModel } from '../../../src/data/models';
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
