import { Router } from 'express';
import { Db } from 'mongodb';
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

    this.rootRouter.use('/users', userInitializer.router);
  }
}

export default RootInitializer;
