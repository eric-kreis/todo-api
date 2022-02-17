import { StatusCodes } from 'http-status-codes';
import { ITaskService } from '../../domains/application/service';
import { ITaskValidator } from '../../domains/application/validators';
import { ITaskSchema } from '../../domains/data/schemas/task';
import { ITaskRepository } from '../../domains/entity/respository';
import { RequestErrorBuilder } from '../../entities/builders';

class TaskService implements ITaskService {
  constructor(
    private readonly repository: ITaskRepository,
    private readonly validator: ITaskValidator,
  ) {

  }

  public async create(task: ITaskSchema) {
    const validation = this.validator.create(task);
    if (validation.error) {
      throw new RequestErrorBuilder(StatusCodes.BAD_REQUEST, validation.error.message);
    }

    return this.repository.create(task);
  }

  public async find() {
    return this.repository.find();
  }

  public async findAllByUser(userId: string) {
    return this.repository.findAllByUser(userId);
  }

  public async findById(id: string) {
    return this.repository.findById(id);
  }

  public async update(id: string, payload: Partial<ITaskSchema>) {
    const validation = this.validator.update(payload);
    if (validation.error) {
      throw new RequestErrorBuilder(StatusCodes.BAD_REQUEST, validation.error.message);
    }

    return this.repository.update(id, payload);
  }

  public async delete(id: string) {
    return this.repository.delete(id);
  }
}

export default TaskService;
