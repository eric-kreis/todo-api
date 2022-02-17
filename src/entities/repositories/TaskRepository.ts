import { ITaskModel } from '../../domains/data/model';
import { ITaskRepository } from '../../domains/entity/respository';

class TaskRepository implements ITaskRepository {
  constructor(private model: ITaskModel) {}
}

export default TaskRepository;
