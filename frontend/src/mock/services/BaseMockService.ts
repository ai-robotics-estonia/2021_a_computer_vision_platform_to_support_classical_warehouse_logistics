import IBaseType from '../../types/api/IBaseType';
import IBaseService from '../../services/interfaces/IBaseService';

export default class BaseMockService<T extends IBaseType>
  implements IBaseService<T>
{
  data: T[];

  constructor(mockData: T[] = []) {
    this.data = mockData;
  }

  deepCopy(): T[] {
    return JSON.parse(JSON.stringify(this.data)) as T[];
  }

  copy(obj: T): T {
    return JSON.parse(JSON.stringify(obj)) as T;
  }

  getAll = async (): Promise<T[]> => {
    return this.deepCopy();
  };

  get = async (): Promise<T | null> => {
    return this.deepCopy()[0] ?? null;
  };

  getById = async (id?: number | string): Promise<T | null> => {
    if (!id || id === 0) return null;
    return this.deepCopy().find(i => i.id === Number(id)) ?? null;
  };

  save = async (obj: T): Promise<T | null> => {
    if (obj.id > 0) return await this.update(obj);

    const base = {
      id: Math.round(Math.random() * 10000),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as IBaseType;
    const entity = { ...this.copy(obj), ...base };
    this.data = [...this.deepCopy(), entity];
    return entity;
  };

  update = async (obj: T): Promise<T | null> => {
    if (!(obj.id > 0)) return this.save(obj);
    const entity = { ...this.copy(obj), updatedAt: new Date() };
    this.data.splice(
      this.data.findIndex(i => i.id === obj.id),
      1
    );
    this.data = [...this.deepCopy(), entity];
    return await this.getById(obj.id);
  };
  updateMany = async (objs: T[]): Promise<T[]> => {
    const promises: Promise<T | null>[] = [];
    for (const obj of objs) promises.push(this.update(obj));
    const items = await Promise.all(promises);
    return items.filter(i => !!i) as T[];
  };

  patch = async (obj: T): Promise<T | null> => {
    const entity = await this.getById(obj.id);
    if (!entity) return null;
    // @ts-ignore
    entity.status = obj.status;
    return this.update(entity);
  };

  delete = async (id: string | number): Promise<boolean> => {
    const entity = await this.getById(id);
    if (!entity) return false;
    this.data.splice(
      this.data.findIndex(i => i.id === id),
      1
    );
    return true;
  };

  deleteMany = async (objs: T[]): Promise<boolean[]> => {
    const promises: Promise<boolean>[] = [];
    for (const obj of objs) promises.push(this.delete(obj.id));
    return await Promise.all(promises);
  };

  search = async (): Promise<T[]> => {
    return this.data;
  };
}
