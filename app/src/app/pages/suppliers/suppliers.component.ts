import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { ButtonComponent } from '@components/button/button.component';
import { PhoneFieldComponent } from '@components/phone-field/phone-field.component';
import { DatatableComponent } from '@components/datatable/datatable.component';
import { TextFieldComponent } from '@components/text-field/text-field.component';
import {
  IEntity,
  IEntityColumn,
  IEntityCreate,
  IEntityUpdate,
  IEntityControls,
  IColumn,
  IGetEntity,
} from '@interfaces/index';
import { EntitiesService } from '@services/entities.service';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { Subscription } from 'rxjs';
import { DocumentFieldComponent } from '@components/document-field/document-field.component';
import { AuthService } from '@services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { eEntityType } from '@enums/entity-type.enum';
import { IActionResponse } from '@interfaces/action-response.interface';
import { eActions } from '@enums/actions.enum';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { eDocumentType } from '@enums/document-type.enum';
import { index } from 'src/environments/configurations';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [
    CommonModule,
    DatatableComponent,
    ButtonComponent,
    NzDrawerModule,
    TextFieldComponent,
    PhoneFieldComponent,
    DocumentFieldComponent,
    NzModalModule,
    ReactiveFormsModule,
    NzDrawerModule,
    FormsModule,
    NzIconModule,
  ],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SuppliersComponent implements OnInit, OnDestroy {
  private entitiesService = inject(EntitiesService);
  private authService = inject(AuthService);
  private notification = inject(NzNotificationService);
  private modal = inject(NzModalService);

  private subscriptions: Subscription[] = [];
  private entities: IEntity[] = [];
  private entitiesBackup: IEntity[] = [];
  private requestLimit = 15;
  private allDataUploaded = false;
  private getEntityProps: IGetEntity = {
    type: eEntityType.Supplier,
    requestLimit: this.requestLimit,
  };
  private userAction?: eActions;

  public isLoading = true;
  public suppliers: IEntityColumn[] = [];
  public columns: IColumn[] = [
    {
      name: 'Nombre',
      key: 'fullName',
      width: null,
    },
    {
      name: 'Empresa',
      key: 'businessName',
      width: null,
    },
    {
      name: 'Identificación',
      key: 'identificationDocument',
      width: null,
    },
    {
      name: 'Correo',
      key: 'email',
      width: null,
    },
    {
      name: 'Teléfono',
      key: 'phone',
      width: '200px',
    },
    {
      name: 'Acciones',
      key: 'actions',
      width: '50px',
    },
  ];
  public selected?: IEntity;
  public openDrawer = false;
  public isSubmitting = false;
  public isLoadingInfiniteScroll = false;
  public query = '';

  private fb = inject(FormBuilder);
  public form: FormGroup<IEntityControls>;

  constructor() {
    this.buildForm();
  }

  public ngOnDestroy(): void {
    if (this.subscriptions.length)
      this.subscriptions.forEach((s) => s.unsubscribe());
  }

  public ngOnInit(): void {
    this.buildForm();
    this.loadData();
  }

  public controlInvalid(control: string) {
    return this.form.get(control)?.invalid && this.form.get(control)?.dirty;
  }

  public loadData() {
    this.isLoading = true;
    const getData = this.entitiesService
      .getList(this.getEntityProps)
      .subscribe({
        next: (response) => {
          this.allDataUploaded = response.length === 0;
          this.mapEntities(response);
        },
        error: (err) =>
          this.notification.error(`Error ${err.status}`, err.error),
      });

    this.subscriptions.push(getData);
  }

  private buildForm() {
    const {
      name,
      lastName,
      businessName,
      notes,
      phone,
      customerAcquisitionId,
      email,
      address,
      identificationDocument,
    } = this.selected || {};

    let documentType, documentNumber, codePhone, phoneNumber;

    if (this.selected) {
      documentType = identificationDocument?.split('-')[0] as eDocumentType;
      documentNumber = identificationDocument?.split('-')[1];
      codePhone = phone?.split('-')[0];
      phoneNumber = phone?.split('-')[1];
    }

    this.form = this.fb.group({
      name: [name ?? null, [Validators.required]],
      lastName: [lastName ?? null, [Validators.required]],
      businessName: [businessName ?? null, [Validators.required]],
      documentType: [
        documentType ?? eDocumentType.Venezolano,
        [Validators.required],
      ],
      documentNumber: [documentNumber ?? null, [Validators.required]],
      notes: [notes ?? null],
      codePhone: [codePhone ?? null],
      phone: [phoneNumber ?? null],
      customerAcquisitionId: [customerAcquisitionId ?? null],
      email: [email ?? null, [Validators.required, Validators.email]],
      address: [address ?? null, [Validators.required]],
      type: [
        { value: eEntityType.Supplier, disabled: true },
        [Validators.required],
      ],
    });
  }

  private mapEntities(entities: IEntity[] = [], isSearch = false) {
    const suppliersMapped = entities.map((e) => ({
      key: e.objectID || '',
      fullName: `${e.name} ${e.lastName}`,
      businessName: e.businessName,
      identificationDocument: e.identificationDocument,
      email: e.email,
      phone: e.phone,
    }));

    if (!isSearch) {
      if (this.userAction) {
        if (this.userAction === eActions.Create) {
          const newEntity = entities[0];
          this.entities.push(newEntity);
          this.entitiesBackup.push(newEntity);
          this.suppliers = [suppliersMapped[0], ...this.suppliers];
        } else if (this.userAction === eActions.Update) {
          const recordUpdated = entities.find(
            (e) => e.objectID === this.selected?.objectID
          );

          if (recordUpdated) {
            const recordUpdatedMapped = suppliersMapped.find(
              (s) => s.key === recordUpdated?.objectID
            );

            this.entities = this.entities.map((e) =>
              e.objectID === recordUpdated.objectID ? recordUpdated : e
            );
            this.entitiesBackup = this.entitiesBackup.map((e) =>
              e.objectID === recordUpdated.objectID ? recordUpdated : e
            );
            this.suppliers = this.suppliers.map((s) =>
              s.key === recordUpdatedMapped?.key ? recordUpdatedMapped : s
            );
          }
        } else if (this.userAction === eActions.Delete) {
          this.entities = this.entities.filter(
            (e) => e.objectID !== this.selected?.objectID
          );
          this.entitiesBackup = this.entitiesBackup.filter(
            (e) => e.objectID !== this.selected?.objectID
          );
          this.suppliers = this.suppliers.filter(
            (e) => e.key !== this.selected?.objectID
          );
        }
      } else {
        this.entities.push(...entities);
        this.entitiesBackup.push(...entities);
        this.suppliers = [...this.suppliers, ...suppliersMapped];
      }
    } else {
      this.entities = [...entities];
      this.suppliers = [...suppliersMapped];
    }

    this.isLoading = false;
    this.isLoadingInfiniteScroll = false;
    this.userAction = undefined;
    this.selected = undefined;
  }

  public handleClose(): void {
    this.openDrawer = false;
    this.isSubmitting = false;
    if (!this.userAction) this.selected = undefined;
  }

  public handleOpen() {
    this.buildForm();
    this.openDrawer = true;
  }

  public handleScroll() {
    if (this.entities.length && !this.allDataUploaded) {
      this.isLoadingInfiniteScroll = true;
      const lastRequest = this.entities[this.entities.length - 1].createdAt;
      this.getEntityProps = { ...this.getEntityProps, lastRequest };
      if (!this.query.length) {
        this.loadData();
      } else {
        const offset = this.entities.length;
        this.handleSearch(offset);
      }
    }
  }

  public async handleSubmit() {
    if (this.form.invalid) {
      this.notification.info(
        'Nuevo registro',
        'Debes completar los campos marcados con un *'
      );
      return;
    }
    this.isSubmitting = true;

    const authToken = await this.authService.getIdTokenResult();

    const { documentType, documentNumber, phone, codePhone, ...rest } =
      this.form.getRawValue();

    if (this.selected) {
      const body: { entity: IEntityUpdate; authToken: string } = {
        entity: {
          ...(rest as IEntityUpdate),
          identificationDocument: `${documentType}-${documentNumber}`,
          phone: `${codePhone}-${phone}`,
        },
        authToken,
      };
      return this.update(this.selected?.objectID || '', body);
    } else {
      const body: { entity: IEntityCreate; authToken: string } = {
        entity: {
          ...(rest as IEntityCreate),
          identificationDocument: `${documentType}-${documentNumber}`,
          phone: `${codePhone}-${phone}`,
        },
        authToken,
      };
      return this.create(body);
    }
  }

  private update(id: string, body: any) {
    this.userAction = eActions.Update;
    this.entitiesService.update(id, body).subscribe({
      next: () => {
        this.handleClose();
        this.notification.success(
          'Actualizar proveedor',
          'Se ha actualizado satisfactoriamente'
        );
      },
      error: (err) => {
        if (err.status > 0) {
          this.notification.error(`Error ${err.status}`, err.error);
          this.isSubmitting = false;
        }
      },
    });
  }

  private create(body: any) {
    this.userAction = eActions.Create;
    this.entitiesService.create(body).subscribe({
      next: () => {
        this.handleClose();
        this.notification.success(
          'Crear proveedor',
          'Se ha creado satisfactoriamente'
        );
      },
      error: (err) => {
        if (err.status > 0) {
          this.notification.error(`Error ${err.status}`, err.error);
          this.isSubmitting = false;
        }
      },
    });
  }

  private async delete(id: string) {
    this.userAction = eActions.Delete;
    this.isLoading = true;
    const authToken = await this.authService.getIdTokenResult();
    this.entitiesService.delete(id, authToken).subscribe({
      next: () => {
        this.isLoading = false;
        this.notification.success(
          'Eliminar proveedor',
          'Se ha eliminado satisfactoriamente'
        );
      },
      error: (err) => {
        if (err.status > 0) {
          this.notification.error(`Error ${err.status}`, err.error);
          this.isLoading = false;
        }
      },
    });
  }

  public handleAction({ id, action }: IActionResponse) {
    if (action === eActions.Delete) {
      this.selected = this.entities.find((e) => e.objectID === id);
      if (this.selected) {
        this.modal.confirm({
          nzTitle: 'Eliminar proveedor',
          nzContent: `¿Estás seguro que quieres eliminar a ${this.selected.name} ${this.selected.lastName} de tus proveedores?`,
          nzOkText: 'Sí, eliminar',
          nzOkType: 'primary',
          nzOkDanger: true,
          nzOnOk: () => this.delete(id),
          nzCancelText: 'No, cancelar',
        });
      }
    }

    if (action === eActions.Update) {
      this.selected = this.entities.find((e) => e.objectID === id);

      this.buildForm();
      this.handleOpen();
      return;
    }
  }

  public async handleSearch(offset?: number, isSearch = false) {
    this.isLoading = true;

    if (!this.query.length) {
      this.mapEntities(this.entitiesBackup);
      this.query = '';
    }

    this.allDataUploaded = false;

    try {
      const { hits } = await index.search(this.query, {
        offset,
        length: this.requestLimit,
        filters: 'isDeleted=0',
      });

      if (hits.length) {
        this.mapEntities(hits as IEntity[], isSearch);
      } else {
        this.allDataUploaded = true;
        this.isLoading = false;
        this.isLoadingInfiniteScroll = false;
      }
    } catch (err: any) {
      this.isLoading = false;
      this.notification.error(`Error ${err.status}`, err.message);
    }
  }

  public handleClearSearch(isSearch?: boolean) {
    this.query = '';
    this.isLoading = true;
    this.mapEntities(this.entitiesBackup, isSearch);
  }
}
