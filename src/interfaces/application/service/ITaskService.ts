import { ITaskSchema, ITaskWithId } from '../../data/schemas/task';

interface ITaskService {
  create(user: ITaskSchema): Promise<ITaskWithId>;
  find(): Promise<ITaskWithId[]>;
  findAllByUser(userId: string): Promise<ITaskWithId[]>;
  findById(id: string): Promise<ITaskWithId>;
  update(id: string, payload: Partial<ITaskWithId>): Promise<ITaskWithId>;
  delete(id: string): Promise<ITaskWithId>;
}

export default ITaskService;
