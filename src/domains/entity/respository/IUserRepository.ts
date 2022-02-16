import { IUserSchema, IUserWithId } from '../../data/schemas/user';

interface IUserRepository {
  create(user: Omit<IUserSchema, 'role'>): Promise<IUserWithId>;
  find(): Promise<IUserWithId[]>;
  findById(id: string): Promise<IUserWithId>;
  findByCredentials(email: string, password: string): Promise<IUserWithId>;
  update(id: string, payload: Partial<IUserSchema>): Promise<IUserWithId>;
  delete(id: string): Promise<IUserWithId>;
}

export default IUserRepository;
