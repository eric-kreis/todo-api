import DataErrorStruct from '../../data/structs/DataErrorStruct';
import IUserRepository from '../../interfaces/entity/respository/IUserRepository';
import { IUserModel } from '../../interfaces/data/model';
import { IUserSchema } from '../../interfaces/data/schemas/user';
import Codes from '../../utils/Codes';
import { BaseRepository } from '.';

class UserRepository extends BaseRepository<IUserSchema> implements IUserRepository {
  private readonly entity: 'user';

  constructor(private readonly model: IUserModel) {
    super(model, 'user');
    this.entity = 'user';
  }

  public async create(user: Omit<IUserSchema, 'role'>) {
    const alreadyExists = await this.model.findByEmail(user.email);
    if (alreadyExists) {
      throw new DataErrorStruct(
        Codes.CONFLICT,
        `${this.entity} already registred`,
      );
    }
    return this.model.create(user);
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
          `${this.entity} already registred`,
        );
      }
    }
    const updatedUser = await this.model.update(id, payload);
    if (!updatedUser) throw new DataErrorStruct(Codes.NOT_FOUND, `${this.entity} not found`);
    return updatedUser;
  }
}

export default UserRepository;
