import { ITaskModel } from '../../interfaces/data/model';
import { ITaskSchema } from '../../interfaces/data/schemas/task';
import { ITaskRepository } from '../../interfaces/entity/respository';
import BaseRepository from './BaseRepository';

class TaskRepository extends BaseRepository<ITaskSchema> implements ITaskRepository {
  constructor(private readonly model: ITaskModel) {
    super(model, 'task');
  }

  public async create(task: Omit<ITaskSchema, 'status'>) {
    return this.model.create(task);
  }

  public async findAllByUser(userId: string) {
    return this.model.findAllByUser(userId);
  }
}

export default TaskRepository;
