import { Db } from 'mongodb';
import { IUserModel, IUserSchema } from '../../domains/User';
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

  public async findByCredentials(email: string, password: string) {
    return super.findOne({ email, password: this.decrypt(password) });
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
