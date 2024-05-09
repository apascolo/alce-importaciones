import { eEntityType } from '@enums/eEntityType';
import { IFullAudited } from './IFullAudited';
import { IIdentification } from './IIdentification';

export interface IEntity extends IFullAudited, IIdentification {
  name: string;
  lastName: string;
  businessName?: string | null | null;
  identificationDocument: string;
  notes?: string | null;
  phone?: string | null;
  email: string;
  address?: string | null;
  customerAcquisitionId?: string | null;
  type: eEntityType;
}

export interface IEntityCreate {
  name: string;
  lastName: string;
  businessName?: string | null | null;
  identificationDocument: string;
  notes?: string | null;
  phone?: string | null;
  email: string;
  address?: string | null;
  customerAcquisitionId?: string | null;
  type: eEntityType;
}

export interface IEntityUpdate extends IFullAudited {
  name: string;
  lastName: string;
  businessName?: string | null | null;
  identificationDocument: string;
  notes?: string | null;
  phone?: string | null;
  email: string;
  address?: string | null;
  customerAcquisitionId?: string | null;
  type: eEntityType;
}
