import { ITaskService } from '../../domains/application/service';
import { ITaskValidator } from '../../domains/application/validators';
import { ITaskRepository } from '../../domains/entity/respository';

class TaskService implements ITaskService {
  constructor(
    private readonly repository: ITaskRepository,
    private readonly validator: ITaskValidator,
  ) {}
}

export default TaskService;
