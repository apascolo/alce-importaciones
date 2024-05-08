import { eEntityType } from '@enums/eEntityType';
import { IFullAudited } from './IFullAudited';
import { IIdentification } from './IIdentification';
import { FormControl } from '@angular/forms';

export interface IEntity extends IFullAudited, IIdentification {
  name: string;
  lastName: string;
  businessName: string;
  identificationDocument: string;
  notes?: string;
  phone?: string;
  email: string;
  address: string;
  type: eEntityType;
}

export interface IEntityCreate {
  name: string;
  lastName: string;
  businessName: string;
  identificationDocument: string;
  notes?: string;
  phone?: string;
  email: string;
  address: string;
  type: eEntityType;
}

export interface IEntityUpdate extends IFullAudited {
  name: string;
  lastName: string;
  businessName: string;
  identificationDocument: string;
  notes?: string;
  phone?: string;
  email: string;
  address: string;
  type: eEntityType;
}

export interface IEntityColumn {
  fullName: string;
  businessName: string;
  phone: string;
  email: string;
  key: string;
}

export interface IEntityControls {
  name: FormControl<string | null>;
  lastName: FormControl<string | null>;
  businessName: FormControl<string | null>;
  documentType: FormControl<string | null>;
  documentNumber: FormControl<string | null>;
  notes: FormControl<string | null>;
  phone: FormControl<string | null>;
  email: FormControl<string | null>;
  address: FormControl<string | null>;
  type: FormControl<eEntityType | null>;
}
