import { IModel } from '../../data/model';

interface IRepository<TDocSchema> {
  create(doc: TDocSchema): ReturnType<IModel<TDocSchema>['create']>;

  find(): ReturnType<IModel<TDocSchema>['find']>;

  findById(id: string): ReturnType<IModel<TDocSchema>['findById']>;

  update(id: string, payload: Partial<TDocSchema>): ReturnType<IModel<TDocSchema>['update']>;

  delete(id: string): ReturnType<IModel<TDocSchema>['delete']>;
}

export default IRepository;
