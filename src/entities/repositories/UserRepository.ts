import DataErrorStruct from '../../data/structs/DataErrorStruct';
import { IUserModel, IUserSchema } from '../../domains/model/User';
import Codes from '../../utils/Codes';

class UserRepository {
  private readonly model: IUserModel;

  private readonly entity: 'user';

  constructor(model: IUserModel) {
    this.model = model;
    this.entity = 'user';
  }

  public async create(user: IUserSchema) {
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
    if (payload?.email) {
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
