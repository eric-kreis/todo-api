import { Db } from 'mongodb';
import { IUserSchema } from '../../../domains/model/User';
import SeedBase from '../SeedBase';
import * as userData from './users.json';

class UserSeed extends SeedBase<IUserSchema> {
  private users: IUserSchema[];

  constructor(db: Db) {
    super(db, 'users');
    this.users = userData.docs;
  }

  async execute() {
    await super.insert(this.users);
  }

  async undo() {
    await super.drop();
  }
}

export default UserSeed;
