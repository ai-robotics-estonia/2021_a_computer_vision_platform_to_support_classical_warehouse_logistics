import axios from 'axios';
import IBaseType from '../../types/api/IBaseType';
import IBaseService from '../interfaces/IBaseService';
import URLSearchParamsPropType from '../../types/URLSearchParamsPropType';

export default class BaseService<T extends IBaseType>
  implements IBaseService<T>
{
  controller: string;

  constructor(controller: string) {
    this.controller = controller;
  }

  get = async (): Promise<T | null> => {
    const res = await axios.get<T>(this.controller);
    return res.data ?? null;
  };

  getAll = async (): Promise<T[]> => {
    const res = await axios.get<T[]>(this.controller);
    return res.data ?? [];
  };

  getById = async (id: number | string, relations = ''): Promise<T | null> => {
    if (!id) return null;
    const qs = relations ? new URLSearchParams({ relations }).toString() : '';
    const res = await axios.get<T>(
      `${this.controller}/${id}${qs ? `?${qs}` : ''}`
    );
    return res.data ?? null;
  };

  save = async (obj: T): Promise<T | null> => {
    if (obj.id > 0) return await this.update(obj);
    const res = await axios.post<T>(this.controller, obj);
    return res?.data ?? null;
  };

  update = async (obj: T): Promise<T | null> => {
    if (!(obj.id > 0)) return this.save(obj);
    const res = await axios.put(`${this.controller}/${obj.id}`, obj);
    return res.data ?? null;
  };

  updateMany = async (objs: T[]): Promise<T[]> => {
    const promises: Promise<T | null>[] = [];
    for (const obj of objs) promises.push(this.update(obj));
    const items = await Promise.all(promises);
    return items.filter(i => !!i) as T[];
  };

  patch = async (obj: T): Promise<T | null> => {
    const res = await axios.patch(`${this.controller}/${obj.id}`, obj);
    return res.data ?? null;
  };

  delete = async (id: string | number): Promise<boolean> => {
    const res = await axios.delete(`${this.controller}/${id}`);
    return res.status === 204;
  };

  deleteMany = async (objs: T[]): Promise<boolean[]> => {
    const promises: Promise<boolean>[] = [];
    for (const obj of objs) promises.push(this.delete(obj.id));
    return await Promise.all(promises);
  };

  search = async (obj: URLSearchParamsPropType): Promise<T[]> => {
    if (obj)
      for (const val of Object.values(obj))
        if (Array.isArray(val) && val.length === 0) return [];
    const qs = new URLSearchParams(obj).toString();

    const res = await axios.get(`${this.controller}${qs ? `?${qs}` : ''}`);
    return res.data ?? [];
  };
}
