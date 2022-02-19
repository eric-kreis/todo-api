import {
  Collection,
  Db,
  Filter,
  ObjectId,
  OptionalUnlessRequiredId,
} from 'mongodb';
import { IModel } from '../../interfaces/data/model';
import IDefaultKeys from '../../interfaces/data/IDefaultKeys';

abstract class BaseModel<TDocSchema extends IDefaultKeys> implements IModel<TDocSchema> {
  private readonly collection: Collection<TDocSchema & IDefaultKeys>;

  constructor(db: Db, collectionName: string) {
    this.collection = db.collection<TDocSchema & IDefaultKeys>(collectionName);
  }

  // protected
  protected async findOne(payload: Partial<TDocSchema>) {
    const document = await this.collection.findOne(payload);
    if (!document) return null;
    const { _id: id, ...rest } = document;
    return { id: id.toString(), ...rest };
  }

  protected async findAll(payload: Partial<TDocSchema>) {
    const documents = await this.collection.find(payload).toArray();
    return documents.map(({ _id: id, ...rest }) => ({ id: id.toString(), ...rest }));
  }

  // public
  public async create(document: OptionalUnlessRequiredId<TDocSchema>) {
    const currentDate = new Date();
    const newDoc = {
      ...document,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    const { insertedId } = await this.collection.insertOne(newDoc);
    const { _id: ID, ...rest } = newDoc;
    return { id: insertedId.toString(), ...rest };
  }

  public async find() {
    const documents = await this.collection.find().toArray();
    return documents.map(({ _id: id, ...rest }) => ({ id: id.toString(), ...rest }));
  }

  public async findById(id: string) {
    if (!ObjectId.isValid(id)) return null;
    const document = await this.collection.findOne(
      { _id: new ObjectId(id) } as unknown as Filter<TDocSchema>,
    );
    if (!document) return null;
    const { _id: ID, ...rest } = document;
    return { id, ...rest };
  }

  public async update(id: string, payload: Partial<TDocSchema>) {
    if (!ObjectId.isValid(id)) return null;
    const oldDocument = await this.collection.findOne(
      { _id: new ObjectId(id) } as unknown as Filter<TDocSchema>,
    );
    if (!oldDocument) return null;
    const currentDate = new Date();
    await this.collection.updateOne(
      { _id: new ObjectId(id) } as unknown as Filter<TDocSchema>,
      {
        $set: {
          ...payload,
          createdAt: oldDocument.createdAt,
          updatedAt: currentDate,
        },
      },
    );

    const { _id: ID, ...rest } = oldDocument;
    return { id, ...rest, ...payload };
  }

  public async delete(id: string) {
    if (!ObjectId.isValid(id)) return null;
    const document = await this.collection.findOne(
      { _id: new ObjectId(id) } as unknown as Filter<TDocSchema>,
    );
    if (!document) return null;
    await this.collection.deleteOne(
      { _id: new ObjectId(id) } as unknown as Filter<TDocSchema>,
    );
    const { _id: ID, ...rest } = document;
    return { id: id.toString(), ...rest };
  }
}

export default BaseModel;
