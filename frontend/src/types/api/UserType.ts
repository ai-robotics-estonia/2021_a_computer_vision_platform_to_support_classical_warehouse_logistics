import IBaseType from './IBaseType';

export default interface UserType extends IBaseType {
  email: string;
  isValidated: boolean;
  isAdmin: boolean;
}
