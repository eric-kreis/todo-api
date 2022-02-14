import { Db, ObjectId } from 'mongodb';
import { ITaskModel, ITaskSchema } from '../../domains/Task';
import BaseModel from './BaseModel';

class TaskModel extends BaseModel<ITaskSchema> implements ITaskModel {
  constructor(db: Db) {
    super(db, 'tasks');
  }

  public async findAllByUser(userId: string) {
    return super.findAll({ userId });
  }

  public async findOneByUser(userId: string) {
    if (!ObjectId.isValid(userId)) return null;
    const task = await super.findOne({ userId });
    return task;
  }
}

export default TaskModel;
