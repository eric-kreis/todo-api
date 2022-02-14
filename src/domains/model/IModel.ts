import { EnhancedOmit, OptionalUnlessRequiredId, WithId } from 'mongodb';
// import IDefaultKeys from './IDefaultKeys';

type SchemaWithId<TDocSchema> = { id: string } & TDocSchema;

interface IModel<TDocSchema> {
  create(doc: OptionalUnlessRequiredId<TDocSchema>): Promise<
  SchemaWithId<OptionalUnlessRequiredId<TDocSchema>>>;

  find(): Promise<
  SchemaWithId<Omit<WithId<TDocSchema>, '_id'>>[]>;

  findById(id: string): Promise<
  SchemaWithId<Omit<WithId<TDocSchema>, '_id'>> | null>;

  update(id: string, payload: Partial<TDocSchema>): Promise<
  EnhancedOmit<TDocSchema, '_id'> | null>;

  delete(id: string): Promise<
  SchemaWithId<Omit<WithId<TDocSchema>, '_id'>> | null>;
}

export default IModel;
