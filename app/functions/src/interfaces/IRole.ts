import { ePermissions } from '../enums';
import { IFullAudited } from './IFullAudited';
import { IIdentification } from './IIdentification';

export interface IRole extends IIdentification, IFullAudited {
  name: string;
  nameLowercase: string;
  permissions: ePermissions[];
  users: number;
}

export interface IRoleCreate extends IFullAudited {
  name: string;
  nameLowercase: string;
  permissions: ePermissions[];
  users: number;
}

export interface IRoleUpdate extends IFullAudited {
  name: string;
  nameLowercase: string;
  permissions: ePermissions[];
  users: number;
}
