import IDefaultKeys from './IDefaultKeys';

export interface ITaskSchema extends IDefaultKeys {
  text: string;
  status: string;
  userId: string;
}

type TaskWithId = ITaskSchema & { id: string };

interface ITaskModel {
  create(task: ITaskSchema): Promise<TaskWithId>;

  find(): Promise<TaskWithId[]>;

  findAllByUser(userId: string): Promise<TaskWithId[]>;

  findById(id: string): Promise<TaskWithId | null>;

  findOneByUser(userId: string): Promise<TaskWithId | null>;

  update(id: string, payload: Partial<ITaskSchema>): Promise<TaskWithId | null>;

  delete(id: string): Promise<TaskWithId | null>;
}

export default ITaskModel;
