import IUserSchema from './IUserSchema';

type UserWithId = IUserSchema & { id: string };

interface IUserModel {
  create(task: IUserSchema): Promise<UserWithId>;

  find(): Promise<UserWithId[]>;

  findByCredentials(email: string, password: string): Promise<UserWithId | null>;

  findById(id: string): Promise<UserWithId | null>;

  update(id: string, payload: Partial<IUserSchema>): Promise<UserWithId | null>;

  delete(id: string): Promise<UserWithId | null>;
}

export default IUserModel;
