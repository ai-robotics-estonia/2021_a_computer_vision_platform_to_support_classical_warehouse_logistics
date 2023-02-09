import URLSearchParamsPropType from '../../types/URLSearchParamsPropType';

export default interface IBaseService<T> {
  get(): Promise<T | null>;
  getAll(): Promise<T[]>;
  getById(id?: string | number): Promise<T | null>;
  save(obj: T): Promise<T | null>;
  update(obj: T): Promise<T | null>;
  updateMany(objs: T[]): Promise<T[]>;
  patch(obj: T): Promise<T | null>;
  delete(id: string | number): Promise<boolean>;
  deleteMany(objs: T[]): Promise<boolean[]>;
  search(obj?: URLSearchParamsPropType): Promise<T[]>;
}
