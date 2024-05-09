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
} from '@angular/forms';
import { ButtonComponent } from '@components/button/button.component';
import { DatatableComponent } from '@components/datatable/datatable.component';
import { TextFieldComponent } from '@components/text-field/text-field.component';
import { eEntityType } from '@enums/eEntityType';
import {
  IEntity,
  IEntitySupplierColumn,
  IEntityControls,
  IEntityCreate,
} from '@interfaces/index';
import { SuppliersService } from '@services/suppliers.service';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [
    CommonModule,
    DatatableComponent,
    ButtonComponent,
    NzDrawerModule,
    ReactiveFormsModule,
    TextFieldComponent,
  ],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuppliersComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private suppliersService = inject(SuppliersService);

  private subscription: Subscription;

  public isLoading = false;
  public isSubmitting = false;
  public listOfData: IEntitySupplierColumn[] = Array(50)
    .fill(null)
    .map((_, i) => ({
      key: `${i + 1}`,
      fullName: 'John Brown ' + i + 1,
      businessName: 'nombre de empresa' + i + 1,
      phone: '+58-4244481659',
      email: 'email@gmail.com',
    }));

  public isVisible = true;
  public form: FormGroup<IEntityControls>;
  public selected: IEntity;

  constructor() {
    this.buildForm();
  }

  public ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      businessName: ['', [Validators.required]],
      documentType: ['', [Validators.required]],
      documentNumber: ['', [Validators.required]],
      notes: [''],
      phone: [''],
      customerAcquisitionId: [''],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      type: [
        { value: eEntityType.Supplier, disabled: true },
        [Validators.required],
      ],
    });
  }

  public handleOpen(): void {
    this.isVisible = true;
  }

  public handleClose(): void {
    this.isVisible = false;
  }

  public handleSubmit() {
    console.log(this.form.getRawValue());
    return;
    if (this.form.invalid) return;

    this.isSubmitting = true;

    const { documentType, documentNumber, ...rest } = this.form.getRawValue();

    const body: IEntityCreate = {
      ...(rest as IEntityCreate),
      identificationDocument: `${documentType}-${documentNumber}`,
    };

    this.suppliersService
      .create(body)
      .subscribe(() => (this.isSubmitting = false));
  }
}
