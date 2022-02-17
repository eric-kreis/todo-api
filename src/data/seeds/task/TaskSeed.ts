/* eslint-disable no-underscore-dangle */

import { Db } from 'mongodb';
import { ITaskSchema } from '../../../domains/data/schemas/task';
import { IUserSchema } from '../../../domains/data/schemas/user';
import SeedBase from '../SeedBase';
import * as tasksData from './tasks.json';

const tasks = tasksData.docs;

class TaskSeed extends SeedBase<ITaskSchema> {
  private tasks: Pick<ITaskSchema, 'text' | 'status'>[];

  constructor(db: Db) {
    super(db, 'tasks');
    this.tasks = tasks as Pick<ITaskSchema, 'text' | 'status'>[];
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
