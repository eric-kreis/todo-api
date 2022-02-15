import { Db } from 'mongodb';
import { IUserModel } from '../../domains/data/model';
import { IUserSchema } from '../../domains/data/schemas/user';
import BaseModel from './BaseModel';

type CryptoFunc = (payload: string) => string;

class UserModel extends BaseModel<IUserSchema> implements IUserModel {
  private encrypt: CryptoFunc;

  private decrypt: CryptoFunc;

  constructor(db: Db, encrypt: CryptoFunc, decrypt: CryptoFunc) {
    super(db, 'users');
    this.encrypt = encrypt;
    this.decrypt = decrypt;
  }

  public async findByEmail(email: string) {
    return super.findOne({ email });
  }

  public async findByCredentials(email: string, password: string) {
    const user = await super.findOne({ email });
    if (user && this.decrypt(user.password) === password) return user;
    return null;
  }

  public async create(user: Pick<IUserSchema, 'email' | 'name' | 'password'>) {
    const password = this.encrypt(user.password);
    const role = 'common';
    return super.create({ ...user, password, role });
  }

  public async update(id: string, payload: Partial<IUserSchema>) {
    if (payload.password) {
      const password = this.encrypt(payload.password);
      return super.update(id, { ...payload, password });
    }

    return super.update(id, payload);
  }
}

export default UserModel;
