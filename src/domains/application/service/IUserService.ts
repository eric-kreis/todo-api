import { IUserSchema, IUserWithId } from '../../data/schemas/user';

interface IUserService {
  create(user: IUserSchema): Promise<IUserWithId>;
  find(): Promise<IUserWithId[]>;
  findById(id: string): Promise<IUserWithId>;
  signin(email: string, password: string): Promise<IUserWithId>;
  update(id: string, payload: Partial<IUserSchema>): Promise<IUserWithId>;
  delete(id: string): Promise<IUserWithId>;
}

export default IUserService;
