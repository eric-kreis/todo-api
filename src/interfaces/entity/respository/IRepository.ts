import { OptionalUnlessRequiredId, WithId } from 'mongodb';

type SchemaWithId<TDocSchema> = { id: string } & TDocSchema;

interface IRepository<TDocSchema> {
  create(doc: OptionalUnlessRequiredId<TDocSchema>): Promise<
  SchemaWithId<Omit<OptionalUnlessRequiredId<TDocSchema>, '_id'>>>;

  find(): Promise<
  SchemaWithId<Omit<WithId<TDocSchema>, '_id'>>[]>;

  findById(id: string): Promise<
  SchemaWithId<Omit<WithId<TDocSchema>, '_id'>>>;

  update(id: string, payload: Partial<TDocSchema>): Promise<
  SchemaWithId<Omit<WithId<TDocSchema>, '_id'>>>;

  delete(id: string): Promise<
  SchemaWithId<Omit<WithId<TDocSchema>, '_id'>>>;
}

export default IRepository;
