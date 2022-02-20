import { ITaskSchema, ITaskWithId } from '../../data/schemas/task';

interface ITaskRepository {
  create(task: Omit<ITaskSchema, 'status'>): Promise<ITaskWithId>;
  find(): Promise<ITaskWithId[]>;
  findAllByUser(userId: string): Promise<ITaskWithId[]>;
  findById(id: string): Promise<ITaskWithId>;
  update(id: string, payload: Partial<ITaskSchema>): Promise<ITaskWithId>;
  delete(id: string): Promise<ITaskWithId>;
}

export default ITaskRepository;
