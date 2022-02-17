import DataErrorStruct from '../../data/structs/DataErrorStruct';
import { ITaskModel } from '../../domains/data/model';
import { ITaskSchema } from '../../domains/data/schemas/task';
import { ITaskRepository } from '../../domains/entity/respository';
import Codes from '../../utils/Codes';

class TaskRepository implements ITaskRepository {
  private readonly entity: 'task';

  constructor(private model: ITaskModel) {
    this.entity = 'task';
  }

  public async create(task: ITaskSchema) {
    return this.model.create(task);
  }

  public async find() {
    return this.model.find();
  }

  public async findAllByUser(userId: string) {
    return this.model.findAllByUser(userId);
  }

  public async findById(id: string) {
    const task = await this.model.findById(id);
    if (!task) throw new DataErrorStruct(Codes.NOT_FOUND, `${this.entity} not found`);
    return task;
  }

  public async update(id: string, payload: Partial<ITaskSchema>) {
    const updatedTask = await this.model.update(id, payload);
    if (!updatedTask) throw new DataErrorStruct(Codes.NOT_FOUND, `${this.entity} not found`);
    return updatedTask;
  }
}

export default TaskRepository;
