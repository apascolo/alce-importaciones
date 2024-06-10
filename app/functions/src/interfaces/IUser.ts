import { IFullAudited } from './IFullAudited';
import { IIdentification } from './IIdentification';

export interface IUser extends IFullAudited, IIdentification {
  name: string;
  lastName: string;
  email: string;
  roleId: string | null;
  phone?: string;
  sales: number;
  notes?: string;
  isDisabled: boolean;
}
export interface IUserCreate extends IFullAudited {
  name: string;
  lastName: string;
  email: string;
  roleId: string | null;
  phone?: string;
  sales: number;
  notes?: string;
  isDisabled: boolean;
}

export interface IUserUpdate extends IFullAudited {
  name: string;
  lastName: string;
  email: string;
  roleId: string | null;
  phone?: string;
  sales: number;
  notes?: string;
  isDisabled: boolean;
}
