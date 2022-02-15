import { Router } from 'express';
import { Db } from 'mongodb';
import UserInitializer from './UserInitializer';

class RootInitializer {
  private rootRouter: Router;

  private connection: () => Promise<Db>;

  constructor(rootRouter: Router, connection: () => Promise<Db>) {
    this.rootRouter = rootRouter;
    this.connection = connection;
  }

  public async handle() {
    const db = await this.connection();
    const userInitializer = new UserInitializer(db);

    this.rootRouter.use('/users', userInitializer.router);
  }
}

export default RootInitializer;
