import { ITaskService } from '../../interfaces/application/service';
import { ITaskValidator } from '../../interfaces/application/validators';
import { ITaskSchema } from '../../interfaces/data/schemas/task';
import { ITaskRepository } from '../../interfaces/entity/respository';
import BaseService from './BaseService';

class TaskService extends BaseService<ITaskSchema> implements ITaskService {
  constructor(
    private readonly repository: ITaskRepository,
    private readonly validator: ITaskValidator,
  ) {
    super(repository, validator);
    this.findAllByUser = this.findAllByUser.bind(this);
  }

  public async findAllByUser(userId: string) {
    return this.repository.findAllByUser(userId);
  }
}

export default TaskService;
