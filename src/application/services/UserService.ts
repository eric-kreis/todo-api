import { StatusCodes } from 'http-status-codes';
import { IUserService } from '../../interfaces/application/service';
import { IUserValidator } from '../../interfaces/application/validators';
import { IUserRepository } from '../../interfaces/entity/respository';
import { IUserSchema } from '../../interfaces/data/schemas/user';
import RequestErrorBuilder from '../../entities/builders/RequestErrorBuilder';

class UserService implements IUserService {
  constructor(
    private readonly repository: IUserRepository,
    private readonly validator: IUserValidator,
  ) {
    this.signin = this.signin.bind(this);
    this.create = this.create.bind(this);
    this.find = this.find.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async signin(email: string, password: string) {
    const validation = this.validator.signin({ email, password });
    if (validation.error) {
      throw new RequestErrorBuilder(StatusCodes.BAD_REQUEST, validation.error.message);
    }
    return this.repository.findByCredentials(email, password);
  }

  async create(user: Omit<IUserSchema, 'role'>) {
    const validation = this.validator.create(user);
    if (validation.error) {
      throw new RequestErrorBuilder(StatusCodes.BAD_REQUEST, validation.error.message);
    }
    return this.repository.create(user);
  }

  async find() {
    return this.repository.find();
  }

  async findById(id: string) {
    return this.repository.findById(id);
  }

  async update(id: string, payload: Partial<IUserSchema>) {
    const validation = this.validator.update(payload);
    if (validation.error) {
      throw new RequestErrorBuilder(StatusCodes.BAD_REQUEST, validation.error.message);
    }
    return this.repository.update(id, payload);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }
}

export default UserService;
