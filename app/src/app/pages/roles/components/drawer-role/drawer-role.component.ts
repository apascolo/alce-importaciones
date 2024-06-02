import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@components/button/button.component';
import { TextFieldComponent } from '@components/text-field/text-field.component';
import { IRole, IRoleControls, IRoleCreate, IRoleRequest, IRoleUpdate } from '@interfaces/role.interface';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ePermissions } from '@enums/permissions.enum';
import { getPermissionValue } from '@utils/get-permission-value.util';
import { NzNotificationService } from 'ng-zorro-antd/notification';

const allPermissions: string[] = [
  'Users',
  'Suppliers',
  'Customers',
  'Roles',
  'Categories',
  'Brands',
  'Products',
  'Sales',
  'Expenses',
  'Banks',
  'CustomerAcquisitions',
  'InfoBusiness',
];

@Component({
  selector: 'app-drawer-role',
  standalone: true,
  imports: [
    CommonModule,
    NzDrawerModule,
    ButtonComponent,
    ReactiveFormsModule,
    TextFieldComponent,
    NzCheckboxModule,
    FormsModule,
    NzIconModule,
    NzToolTipModule,
  ],
  templateUrl: './drawer-role.component.html',
  styleUrl: './drawer-role.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DrawerRoleComponent implements OnInit {
  @Input() openDrawer = false;
  @Input() isSubmitting = false;
  @Input() selected: IRole;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<IRoleCreate | IRoleUpdate>();

  private fb = inject(FormBuilder);
  private notification = inject(NzNotificationService);

  form: FormGroup<IRoleControls>;
  isSubmitted = false;

  constructor() {
    this.buildForm();
  }

  ngOnInit(): void {
    this.buildForm();
    this.checkPermissions();
  }

  private checkPermissions() {
    for (const permission of allPermissions) {
      const key = `all${permission}Permissions`;

      this.form.get(permission.toLowerCase())?.valueChanges.subscribe(controls => {
        const allCheckedValues = Object.values(controls).every(value => value === true);
        this.form.patchValue({ [key]: allCheckedValues });
      });
    }
  }

  private buildForm() {
    const { name } = this.selected || {};

    this.form = this.fb.group({
      name: [name ?? null, [Validators.required]],

      allUsersPermissions: [false],
      users: this.fb.group({
        createUsers: [false],
        updateUsers: [false],
        viewUsers: [false],
        softDeleteUsers: [false],
        hardDeleteUsers: [false],
      }),

      allSuppliersPermissions: [false],
      suppliers: this.fb.group({
        createSuppliers: [false],
        updateSuppliers: [false],
        viewSuppliers: [false],
        softDeleteSuppliers: [false],
        hardDeleteSuppliers: [false],
      }),

      allCustomersPermissions: [false],
      customers: this.fb.group({
        createCustomers: [false],
        updateCustomers: [false],
        viewCustomers: [false],
        softDeleteCustomers: [false],
        hardDeleteCustomers: [false],
      }),

      allRolesPermissions: [false],
      roles: this.fb.group({
        createRoles: [false],
        updateRoles: [false],
        viewRoles: [false],
        deleteRoles: [false],
      }),

      allCategoriesPermissions: [false],
      categories: this.fb.group({
        createCategories: [false],
        updateCategories: [false],
        viewCategories: [false],
        deleteCategories: [false],
      }),

      allBrandsPermissions: [false],
      brands: this.fb.group({
        createBrands: [false],
        updateBrands: [false],
        viewBrands: [false],
        deleteBrands: [false],
      }),

      allProductsPermissions: [false],
      products: this.fb.group({
        createProducts: [false],
        updateProducts: [false],
        viewProducts: [false],
        softDeleteProducts: [false],
        hardDeleteProducts: [false],
      }),

      allSalesPermissions: [false],
      sales: this.fb.group({
        createSales: [false],
        updateSales: [false],
        viewSales: [false],
        softDeleteSales: [false],
        hardDeleteSales: [false],
      }),

      allExpensesPermissions: [false],
      expenses: this.fb.group({
        createExpenses: [false],
        updateExpenses: [false],
        viewExpenses: [false],
        softDeleteExpenses: [false],
        hardDeleteExpenses: [false],
      }),

      allBanksPermissions: [false],
      banks: this.fb.group({
        createBanks: [false],
        updateBanks: [false],
        viewBanks: [false],
        softDeleteBanks: [false],
        hardDeleteBanks: [false],
      }),

      allCustomerAcquisitionsPermissions: [false],
      customeracquisitions: this.fb.group({
        createCustomerAcquisitions: [false],
        updateCustomerAcquisitions: [false],
        viewCustomerAcquisitions: [false],
        softDeleteCustomerAcquisitions: [false],
        hardDeleteCustomerAcquisitions: [false],
      }),

      allInfoBusinessPermissions: [false],
      infobusiness: this.fb.group({
        updateInfoBusiness: [false],
        viewInfoBusiness: [false],
      }),
    });
  }

  controlInvalid(control: string) {
    return (
      (this.isSubmitted && this.form.get(control)?.untouched) ||
      (this.form.get(control)?.invalid && (this.form.get(control)?.dirty || this.form.get(control)?.touched))
    );
  }

  handleClose() {
    this.form.reset();
    this.isSubmitted = false;
    this.onClose.emit();
  }

  handleSubmit() {
    this.isSubmitted = true;
    const { name } = this.form.value;

    const permissions: ePermissions[] = [];
    for (const p of allPermissions) {
      const group = p.toLowerCase();
      if (this.form.get(group)) {
        for (const key in this.form.get(group)?.value) {
          const permissionValueForm = this.form.get(group)?.get(key)?.value;
          if (permissionValueForm) {
            const permissionValue = getPermissionValue(key);
            if (permissionValue) permissions.push(permissionValue);
          }
        }
      }
    }

    if (!permissions.length) {
      return this.notification.info(
        this.selected ? 'Actualizar rol' : 'Crear rol',
        `Debes asignar permisos a este rol para poder ${this.selected ? 'actualizarlo' : 'crearlo'}`
      );
    }

    if (!name || !name.length) return;

    const newRole: IRoleCreate | IRoleUpdate = {
      name: name,
      permissions,
    };

    return this.onSubmit.emit(newRole);
  }

  handleGroup(group: string, checked: boolean) {
    const permission = group.split('all')[1].split('Permissions')[0];

    if (group === 'allPermissions') {
      for (const permission of allPermissions) {
        const group = `all${permission}Permissions`;
        this.form.patchValue({
          [group]: checked,
          [permission.toLowerCase()]: {
            [`create${permission}`]: checked,
            [`update${permission}`]: checked,
            [`view${permission}`]: checked,
            [`softDelete${permission}`]: checked,
            [`hardDelete${permission}`]: checked,
            [`delete${permission}`]: checked,
          },
        });
      }
      return;
    }

    this.form.patchValue({
      [group]: checked,
      [permission.toLowerCase()]: {
        [`create${permission}`]: checked,
        [`update${permission}`]: checked,
        [`view${permission}`]: checked,
        [`softDelete${permission}`]: checked,
        [`hardDelete${permission}`]: checked,
        [`delete${permission}`]: checked,
      },
    });
  }
}
