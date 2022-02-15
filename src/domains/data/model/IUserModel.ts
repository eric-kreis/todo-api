import IModel from './IModel';
import { IUserWithId, IUserSchema } from '../schemas/user';

interface IUserModel extends IModel<IUserSchema> {
  create(user: IUserSchema): Promise<IUserWithId>;

  find(): Promise<IUserWithId[]>;

  findByEmail(email: string): Promise<IUserWithId | null>;

  findByCredentials(email: string, password: string): Promise<IUserWithId | null>;

  findById(id: string): Promise<IUserWithId | null>;

  update(id: string, payload: Partial<IUserSchema>): Promise<IUserWithId | null>;

  delete(id: string): Promise<IUserWithId | null>;
}

export default IUserModel;
