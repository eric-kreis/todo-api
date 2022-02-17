import { Router } from 'express';
import { Db } from 'mongodb';
import TaskInitializer from './TaskInitializer';
import UserInitializer from './UserInitializer';

class RootInitializer {
  constructor(
    private readonly rootRouter: Router,
    private connection: () => Promise<Db>,
  ) {
    this.rootRouter = rootRouter;
  }

  public async handle() {
    const db = await this.connection();
    const userInitializer = new UserInitializer(db);
    const taskInitializer = new TaskInitializer(db);

    this.rootRouter.use('/users', userInitializer.router);
    this.rootRouter.use('/tasks', taskInitializer.router);
  }
}

export default RootInitializer;
