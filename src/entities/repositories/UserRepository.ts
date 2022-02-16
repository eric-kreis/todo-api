import DataErrorStruct from '../../data/structs/DataErrorStruct';
import IUserRepository from '../../domains/entity/respository/IUserRepository';
import { IUserModel } from '../../domains/data/model';
import { IUserSchema } from '../../domains/data/schemas/user';
import Codes from '../../utils/Codes';

class UserRepository implements IUserRepository {
  private readonly entity: 'user';

  constructor(private readonly model: IUserModel) {
    this.model = model;
    this.entity = 'user';
  }

  public async create(user: Omit<IUserSchema, 'role'>) {
    const alreadyExists = await this.model.findByEmail(user.email);
    if (alreadyExists) {
      throw new DataErrorStruct(
        Codes.CONFLICT,
        `${this.entity} alredy registred`,
      );
    }
    return this.model.create(user);
  }

  public async find() {
    return this.model.find();
  }

  public async findById(id: string) {
    const user = await this.model.findById(id);
    if (!user) throw new DataErrorStruct(Codes.NOT_FOUND, `${this.entity} not found`);
    return user;
  }

  public async findByCredentials(email: string, password: string) {
    const user = await this.model.findByCredentials(email, password);
    if (!user) throw new DataErrorStruct(Codes.NOT_FOUND, `${this.entity} not found`);
    return user;
  }

  public async update(id: string, payload: Partial<IUserSchema>) {
    if (payload.email) {
      const alreadyExists = await this.model.findByEmail(payload.email);
      if (alreadyExists) {
        throw new DataErrorStruct(
          Codes.CONFLICT,
          `${this.entity} alredy registred`,
        );
      }
    }
    const updatedUser = await this.model.update(id, payload);
    if (!updatedUser) throw new DataErrorStruct(Codes.NOT_FOUND, `${this.entity} not found`);
    return updatedUser;
  }

  public async delete(id: string) {
    const deletedUser = await this.model.delete(id);
    if (!deletedUser) throw new DataErrorStruct(Codes.NOT_FOUND, `${this.entity} not found`);
    return deletedUser;
  }
}

export default UserRepository;
