import DataErrorStruct from '../../data/structs/DataErrorStruct';
import { IModel } from '../../interfaces/data/model';
import { IRepository } from '../../interfaces/entity/respository';
import Codes from '../../utils/Codes';

abstract class BaseRepository<TDocSchema> implements IRepository<TDocSchema> {
  constructor(
    private readonly childModel: IModel<TDocSchema>,
    private readonly childEntity: string,
  ) {}

  public async create(doc: TDocSchema) {
    return this.childModel.create(doc);
  }

  public async find() {
    return this.childModel.find();
  }

  public async findById(id: string) {
    const doc = await this.childModel.findById(id);
    if (!doc) throw new DataErrorStruct(Codes.NOT_FOUND, `${this.childEntity} not found`);
    return doc;
  }

  public async update(id: string, doc: Partial<TDocSchema>) {
    const updatedDoc = await this.childModel.update(id, doc);
    if (!updatedDoc) throw new DataErrorStruct(Codes.NOT_FOUND, `${this.childEntity} not found`);
    return updatedDoc;
  }

  public async delete(id: string) {
    const deletedDoc = await this.childModel.delete(id);
    if (!deletedDoc) throw new DataErrorStruct(Codes.NOT_FOUND, `${this.childEntity} not found`);
    return deletedDoc;
  }
}

export default BaseRepository;
