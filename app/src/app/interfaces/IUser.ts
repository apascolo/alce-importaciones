import { eRoles } from '@enums/index';
import { IIdentification } from './IIdentification';
import { IImage } from './IImage';
import { IFullAudited } from './IFullAudited';

export interface IUser extends IIdentification, IFullAudited {
  name: string;
  lastName: string;
  email: string;
  role: eRoles;
  phone?: string;
  sales?: number;
  avatar?: IImage;
  notes?: string;
}

export interface IUserCreate {
  name: string;
  lastName: string;
  email: string;
  role: eRoles;
  phone?: string;
  avatar?: IImage;
  notes?: string;
}

export interface IUserUpdate extends IFullAudited {
  name: string;
  lastName: string;
  email: string;
  role: eRoles;
  phone?: string;
  sales?: number;
  avatar?: IImage;
  notes?: string;
}
