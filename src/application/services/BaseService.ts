import { StatusCodes } from 'http-status-codes';
import { RequestErrorBuilder } from '../../entities/builders';
import { IService } from '../../interfaces/application/service';
import { IValidator } from '../../interfaces/application/validators';
import { IRepository } from '../../interfaces/entity/respository';

abstract class BaseService<TDocSchema> implements IService<TDocSchema> {
  constructor(
    private readonly childRepository: IRepository<TDocSchema>,
    private readonly childValidator: IValidator<TDocSchema>,
  ) {
    this.create = this.create.bind(this);
    this.find = this.find.bind(this);
    this.findById = this.findById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async create(doc: TDocSchema) {
    const validation = this.childValidator.create(doc);
    if (validation.error) {
      throw new RequestErrorBuilder(StatusCodes.BAD_REQUEST, validation.error.message);
    }
    return this.childRepository.create(doc);
  }

  public async find() {
    return this.childRepository.find();
  }

  public async findById(id: string) {
    return this.childRepository.findById(id);
  }

  public async update(id: string, payload: Partial<TDocSchema>) {
    const validation = this.childValidator.update(payload);
    if (validation.error) {
      throw new RequestErrorBuilder(StatusCodes.BAD_REQUEST, validation.error.message);
    }
    return this.childRepository.update(id, payload);
  }

  public async delete(id: string) {
    return this.childRepository.delete(id);
  }
}

export default BaseService;
