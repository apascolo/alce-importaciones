import { IIdentification } from './identification.interface';
import { IImage } from './image.interface';
import { IFullAudited } from './full-audited.interface';
import { eRoles } from '@enums/roles.enum';

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
