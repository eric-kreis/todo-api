import { IRepository } from '../../entity/respository';

interface IService<TDocSchema> {
  create(doc: TDocSchema): ReturnType<IRepository<TDocSchema>['create']>;

  find(): ReturnType<IRepository<TDocSchema>['find']>;

  findById(id: string): ReturnType<IRepository<TDocSchema>['findById']>;

  update(id: string, payload: Partial<TDocSchema>): ReturnType<IRepository<TDocSchema>['update']>;

  delete(id: string): ReturnType<IRepository<TDocSchema>['delete']>;
}

export default IService;
