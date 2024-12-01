import { eEntityType } from '@enums/entity-type.enum';
import { IFullAudited } from './full-audited.interface';
import { IIdentification } from './identification.interface';
import { FormControl } from '@angular/forms';
import { eDocumentType } from '@enums/document-type.enum';

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

export interface IEntityColumn {
  fullName: string;
  businessName?: string | null;
  identificationDocument?: string | null;
  phone?: string | null;
  email: string;
  key: string;
  notes?: string | null;
  address?: string | null;
  customerAcquisitionId?: string | null;
  type?: eEntityType | null;
}

export interface IEntityControls {
  name: FormControl<string | null>;
  lastName: FormControl<string | null>;
  businessName: FormControl<string | null>;
  documentType: FormControl<eDocumentType | null>;
  documentNumber: FormControl<string | null>;
  notes: FormControl<string | null>;
  codePhone: FormControl<string | null>;
  phone: FormControl<string | null>;
  email: FormControl<string | null>;
  address: FormControl<string | null>;
  type: FormControl<eEntityType | null>;
  customerAcquisitionId: FormControl<string | null>;
}

export interface IGetEntity {
  type: eEntityType;
  deleted?: boolean;
  requestLimit?: number;
  lastRequest?: number;
}

export interface IEntityRequest {
  entity: IEntityCreate | IEntityUpdate;
  authToken: string;
}
