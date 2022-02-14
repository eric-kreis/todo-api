/* eslint-disable no-underscore-dangle */

import { Db } from 'mongodb';
import { ITaskSchema } from '../../../domains/model/Task';
import { IUserSchema } from '../../../domains/model/User';
import SeedBase from '../SeedBase';
import * as tasksData from './tasks.json';

class TaskSeed extends SeedBase<ITaskSchema> {
  private tasks: Pick<ITaskSchema, 'text' | 'status'>[];

  constructor(db: Db) {
    super(db, 'tasks');
    this.tasks = tasksData.docs;
  }

  async execute() {
    const users = await this.db.collection<IUserSchema>('users').find().toArray();

    const tasksWithUserAndDate = this.tasks.map((task, index) => ({
      ...task,
      userId: users[index]._id.toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await super.insert(tasksWithUserAndDate);
  }

  async undo() {
    await super.drop();
  }
}

export default TaskSeed;
