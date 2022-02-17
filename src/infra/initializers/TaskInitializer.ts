import { Router } from 'express';
import { Db } from 'mongodb';
import { TaskValidator } from '../../application/validators';
import { TaskModel } from '../../data/models';
import { TaskRepository } from '../../entities/repositories';
import schemas from '../../application/joiSchemas/task';
import { TaskService } from '../../application/services';
import { TaskController } from '../controllers';
import { TaskRouter } from '../routers';

class TaskInitializer {
  public readonly router: Router;

  constructor(db: Db) {
    const taskModel = new TaskModel(db);
    const taskRepository = new TaskRepository(taskModel);
    const taskValidator = new TaskValidator(schemas.create, schemas.update);
    const taskService = new TaskService(taskRepository, taskValidator);
    const taskController = new TaskController(taskService);
    const taskRouter = new TaskRouter(taskController);

    this.router = taskRouter.router;
  }
}

export default TaskInitializer;
