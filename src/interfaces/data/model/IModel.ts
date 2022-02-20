import { WithId } from 'mongodb';

type SchemaWithId<TDocSchema> = { id: string } & TDocSchema;

interface IModel<TDocSchema> {
  create(doc: Partial<TDocSchema>): Promise<SchemaWithId<TDocSchema>>;

  find(): Promise<
  SchemaWithId<Omit<WithId<TDocSchema>, '_id'>>[]>;

  findById(id: string): Promise<
  SchemaWithId<Omit<WithId<TDocSchema>, '_id'>> | null>;

  update(id: string, payload: Partial<TDocSchema>): Promise<
  SchemaWithId<Omit<WithId<TDocSchema>, '_id'>> | null>;

  delete(id: string): Promise<
  SchemaWithId<Omit<WithId<TDocSchema>, '_id'>> | null>;
}

export default IModel;
