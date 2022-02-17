import { Db, ObjectId } from 'mongodb';
import { ITaskModel } from '../../domains/data/model';
import { ITaskSchema } from '../../domains/data/schemas/task';
import BaseModel from './BaseModel';

class TaskModel extends BaseModel<ITaskSchema> implements ITaskModel {
  constructor(db: Db) {
    super(db, 'tasks');
  }

  public async findAllByUser(userId: string) {
    if (!ObjectId.isValid(userId)) return [];
    return super.findAll({ userId });
  }
}

export default TaskModel;
