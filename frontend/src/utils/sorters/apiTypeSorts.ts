import IBaseType from '../../types/api/IBaseType';

export const byId = (a: IBaseType, b: IBaseType) => a.id - b.id;
