import { ITaskSchema, ITaskWithId } from '../schemas/task';

interface ITaskModel {
  create(task: Omit<ITaskSchema, 'status'>): Promise<ITaskWithId>;

  find(): Promise<ITaskWithId[]>;

  findAllByUser(userId: string): Promise<ITaskWithId[]>;

  findById(id: string): Promise<ITaskWithId | null>;

  update(id: string, payload: Partial<ITaskSchema>): Promise<ITaskWithId | null>;

  delete(id: string): Promise<ITaskWithId | null>;
}

export default ITaskModel;
