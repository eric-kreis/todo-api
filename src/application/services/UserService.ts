import { StatusCodes } from 'http-status-codes';
import { IUserService } from '../../interfaces/application/service';
import { IUserValidator } from '../../interfaces/application/validators';
import { IUserRepository } from '../../interfaces/entity/respository';
import { IUserSchema } from '../../interfaces/data/schemas/user';
import RequestErrorBuilder from '../../entities/builders/RequestErrorBuilder';
import BaseService from './BaseService';

class UserService extends BaseService<IUserSchema> implements IUserService {
  constructor(
    private readonly repository: IUserRepository,
    private readonly validator: IUserValidator,
  ) {
    super(repository, validator);
    this.signin = this.signin.bind(this);
  }

  async signin(email: string, password: string) {
    const validation = this.validator.signin({ email, password });
    if (validation.error) {
      throw new RequestErrorBuilder(StatusCodes.BAD_REQUEST, validation.error.message);
    }
    return this.repository.findByCredentials(email, password);
  }
}

export default UserService;
