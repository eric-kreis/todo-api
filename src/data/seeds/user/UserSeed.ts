import { Db } from 'mongodb';
import { IUserSchema } from '../../../domains/data/schemas/user';
import encrypt from '../../../helpers/encrypt';
import SeedBase from '../SeedBase';
import * as userData from './users.json';

const users = userData.docs.map(({
  password,
  createdAt,
  updatedAt,
  ...rest
}) => ({
  ...rest,
  password: encrypt(password),
  createdAt: new Date(createdAt),
  updatedAt: new Date(updatedAt),
}));

class UserSeed extends SeedBase<IUserSchema> {
  private users: IUserSchema[];

  constructor(db: Db) {
    super(db, 'users');
    this.users = users;
  }

  async execute() {
    await super.insert(this.users);
  }

  async undo() {
    await super.drop();
  }
}

export default UserSeed;
