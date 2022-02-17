import { ITaskModel } from '../../domains/data/model';
import { ITaskSchema } from '../../domains/data/schemas/task';
import { ITaskRepository } from '../../domains/entity/respository';

class TaskRepository implements ITaskRepository {
  constructor(private model: ITaskModel) {}

  public async create(task: ITaskSchema) {
    return this.model.create(task);
  }

  public async find() {
    return this.model.find();
  }
}

export default TaskRepository;
