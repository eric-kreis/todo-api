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
    this.create = this.create.bind(this);
    this.find = this.find.bind(this);
    this.findAllByUser = this.findAllByUser.bind(this);
    this.findById = this.findById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
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
