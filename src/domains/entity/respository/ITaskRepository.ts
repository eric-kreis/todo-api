import { ITaskSchema, ITaskWithId } from '../../data/schemas/task';

interface ITaskRepository {
  create(task: ITaskSchema): Promise<ITaskWithId>;
  find(): Promise<ITaskWithId[]>;
  findAllByUserId(userId: string): Promise<ITaskWithId[]>;
  findById(id: string): Promise<ITaskWithId>;
  update(id: string, payload: Partial<ITaskSchema>): Promise<ITaskSchema>;
  delete(id: string): Promise<ITaskSchema>;
}

export default ITaskRepository;
