import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  booleanAttribute,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@components/button/button.component';
import { TextFieldComponent } from '@components/text-field/text-field.component';
import { IRole, IRoleControls, IRoleCreate, IRoleUpdate } from '@interfaces/role.interface';
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
    changeDetection: ChangeDetectionStrategy.Default
})
export class DrawerRoleComponent implements OnInit, OnChanges {
  @Input({ transform: booleanAttribute }) openDrawer = false;
  @Input({ transform: booleanAttribute }) isSubmitting = false;
  @Input() selected?: IRole;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<IRoleCreate | IRoleUpdate>();

  private fb = inject(FormBuilder);
  private notification = inject(NzNotificationService);

  form: FormGroup<IRoleControls>;
  isSubmitted = false;
  allPermissionsChecked = false;

  constructor() {
    this.buildForm();
  }

  ngOnChanges(): void {
    if (this.selected && !this.isSubmitted) {
      this.buildForm();
      this.checkPermissions();
    }
  }

  ngOnInit(): void {
    this.buildForm();
    this.checkPermissions();
  }

  private validateAllCheckedGroup(permissionsToVerify: ePermissions[]) {
    const { permissions } = this.selected || {};

    if (!permissions) return false;

    return permissionsToVerify.every(p => permissions.includes(p));
  }

  private checkPermissions() {
    for (const permissionGroup of allPermissions) {
      const key = `all${permissionGroup}Permissions`;

      this.form.get(permissionGroup.toLowerCase())?.valueChanges.subscribe(controls => {
        const allCheckedValues = Object.values(controls).every(value => value === true);
        this.form.patchValue({ [key]: allCheckedValues });
      });
    }
  }

  private getValueCheckedPermissionsGroup() {
    const allUsersPermissions = this.validateAllCheckedGroup([
      ePermissions.CreateUsers,
      ePermissions.UpdateUsers,
      ePermissions.ViewUsers,
      ePermissions.SoftDeleteUsers,
      ePermissions.HardDeleteUsers,
    ]);

    const allSuppliersPermissions = this.validateAllCheckedGroup([
      ePermissions.CreateSuppliers,
      ePermissions.UpdateSuppliers,
      ePermissions.ViewSuppliers,
      ePermissions.SoftDeleteSuppliers,
      ePermissions.HardDeleteSuppliers,
    ]);

    const allCustomersPermissions = this.validateAllCheckedGroup([
      ePermissions.CreateCustomers,
      ePermissions.UpdateCustomers,
      ePermissions.ViewCustomers,
      ePermissions.SoftDeleteCustomers,
      ePermissions.HardDeleteCustomers,
    ]);

    const allRolesPermissions = this.validateAllCheckedGroup([
      ePermissions.CreateRoles,
      ePermissions.UpdateRoles,
      ePermissions.ViewRoles,
      ePermissions.DeleteRoles,
    ]);

    const allCategoriesPermissions = this.validateAllCheckedGroup([
      ePermissions.CreateCategories,
      ePermissions.UpdateCategories,
      ePermissions.ViewCategories,
      ePermissions.DeleteCategories,
    ]);

    const allBrandsPermissions = this.validateAllCheckedGroup([
      ePermissions.CreateBrands,
      ePermissions.UpdateBrands,
      ePermissions.ViewBrands,
      ePermissions.DeleteBrands,
    ]);

    const allProductsPermissions = this.validateAllCheckedGroup([
      ePermissions.CreateProducts,
      ePermissions.UpdateProducts,
      ePermissions.ViewProducts,
      ePermissions.SoftDeleteProducts,
      ePermissions.HardDeleteProducts,
    ]);

    const allSalesPermissions = this.validateAllCheckedGroup([
      ePermissions.CreateSales,
      ePermissions.UpdateSales,
      ePermissions.ViewSales,
      ePermissions.SoftDeleteSales,
      ePermissions.HardDeleteSales,
    ]);

    const allExpensesPermissions = this.validateAllCheckedGroup([
      ePermissions.CreateExpenses,
      ePermissions.UpdateExpenses,
      ePermissions.ViewExpenses,
      ePermissions.SoftDeleteExpenses,
      ePermissions.HardDeleteExpenses,
    ]);

    const allBanksPermissions = this.validateAllCheckedGroup([
      ePermissions.CreateBanks,
      ePermissions.UpdateBanks,
      ePermissions.ViewBanks,
      ePermissions.SoftDeleteBanks,
      ePermissions.HardDeleteBanks,
    ]);

    const allCustomerAcquisitionsPermissions = this.validateAllCheckedGroup([
      ePermissions.CreateCustomerAcquisitions,
      ePermissions.UpdateCustomerAcquisitions,
      ePermissions.ViewCustomerAcquisitions,
      ePermissions.SoftDeleteCustomerAcquisitions,
      ePermissions.HardDeleteCustomerAcquisitions,
    ]);

    const allInfoBusinessPermissions = this.validateAllCheckedGroup([
      ePermissions.UpdateInfoBusiness,
      ePermissions.ViewInfoBusiness,
    ]);

    this.allPermissionsChecked =
      allUsersPermissions &&
      allSuppliersPermissions &&
      allCustomersPermissions &&
      allRolesPermissions &&
      allCategoriesPermissions &&
      allBrandsPermissions &&
      allProductsPermissions &&
      allSalesPermissions &&
      allExpensesPermissions &&
      allBanksPermissions &&
      allCustomerAcquisitionsPermissions &&
      allInfoBusinessPermissions;

    return {
      allUsersPermissions,
      allSuppliersPermissions,
      allCustomersPermissions,
      allRolesPermissions,
      allCategoriesPermissions,
      allBrandsPermissions,
      allProductsPermissions,
      allSalesPermissions,
      allExpensesPermissions,
      allBanksPermissions,
      allCustomerAcquisitionsPermissions,
      allInfoBusinessPermissions,
    };
  }

  private buildForm() {
    const { name, permissions } = this.selected || {};

    const {
      allUsersPermissions,
      allSuppliersPermissions,
      allCustomersPermissions,
      allRolesPermissions,
      allCategoriesPermissions,
      allBrandsPermissions,
      allProductsPermissions,
      allSalesPermissions,
      allExpensesPermissions,
      allBanksPermissions,
      allCustomerAcquisitionsPermissions,
      allInfoBusinessPermissions,
    } = this.getValueCheckedPermissionsGroup();

    this.form = this.fb.group({
      name: [name ?? null, [Validators.required]],

      allUsersPermissions: [allUsersPermissions],
      users: this.fb.group({
        createUsers: [(permissions || []).includes(ePermissions.CreateUsers)],
        updateUsers: [(permissions || []).includes(ePermissions.UpdateUsers)],
        viewUsers: [(permissions || []).includes(ePermissions.ViewUsers)],
        softDeleteUsers: [(permissions || []).includes(ePermissions.SoftDeleteUsers)],
        hardDeleteUsers: [(permissions || []).includes(ePermissions.HardDeleteUsers)],
      }),

      allSuppliersPermissions: [allSuppliersPermissions],
      suppliers: this.fb.group({
        createSuppliers: [(permissions || []).includes(ePermissions.CreateSuppliers)],
        updateSuppliers: [(permissions || []).includes(ePermissions.UpdateSuppliers)],
        viewSuppliers: [(permissions || []).includes(ePermissions.ViewSuppliers)],
        softDeleteSuppliers: [(permissions || []).includes(ePermissions.SoftDeleteSuppliers)],
        hardDeleteSuppliers: [(permissions || []).includes(ePermissions.HardDeleteSuppliers)],
      }),

      allCustomersPermissions: [allCustomersPermissions],
      customers: this.fb.group({
        createCustomers: [(permissions || []).includes(ePermissions.CreateCustomers)],
        updateCustomers: [(permissions || []).includes(ePermissions.UpdateCustomers)],
        viewCustomers: [(permissions || []).includes(ePermissions.ViewCustomers)],
        softDeleteCustomers: [(permissions || []).includes(ePermissions.SoftDeleteCustomers)],
        hardDeleteCustomers: [(permissions || []).includes(ePermissions.HardDeleteCustomers)],
      }),

      allRolesPermissions: [allRolesPermissions],
      roles: this.fb.group({
        createRoles: [(permissions || []).includes(ePermissions.CreateRoles)],
        updateRoles: [(permissions || []).includes(ePermissions.UpdateRoles)],
        viewRoles: [(permissions || []).includes(ePermissions.ViewRoles)],
        deleteRoles: [(permissions || []).includes(ePermissions.DeleteRoles)],
      }),

      allCategoriesPermissions: [allCategoriesPermissions],
      categories: this.fb.group({
        createCategories: [(permissions || []).includes(ePermissions.CreateCategories)],
        updateCategories: [(permissions || []).includes(ePermissions.UpdateCategories)],
        viewCategories: [(permissions || []).includes(ePermissions.ViewCategories)],
        deleteCategories: [(permissions || []).includes(ePermissions.DeleteCategories)],
      }),

      allBrandsPermissions: [allBrandsPermissions],
      brands: this.fb.group({
        createBrands: [(permissions || []).includes(ePermissions.CreateBrands)],
        updateBrands: [(permissions || []).includes(ePermissions.UpdateBrands)],
        viewBrands: [(permissions || []).includes(ePermissions.ViewBrands)],
        deleteBrands: [(permissions || []).includes(ePermissions.DeleteBrands)],
      }),

      allProductsPermissions: [allProductsPermissions],
      products: this.fb.group({
        createProducts: [(permissions || []).includes(ePermissions.CreateProducts)],
        updateProducts: [(permissions || []).includes(ePermissions.UpdateProducts)],
        viewProducts: [(permissions || []).includes(ePermissions.ViewProducts)],
        softDeleteProducts: [(permissions || []).includes(ePermissions.SoftDeleteProducts)],
        hardDeleteProducts: [(permissions || []).includes(ePermissions.HardDeleteProducts)],
      }),

      allSalesPermissions: [allSalesPermissions],
      sales: this.fb.group({
        createSales: [(permissions || []).includes(ePermissions.CreateSales)],
        updateSales: [(permissions || []).includes(ePermissions.UpdateSales)],
        viewSales: [(permissions || []).includes(ePermissions.ViewSales)],
        softDeleteSales: [(permissions || []).includes(ePermissions.SoftDeleteSales)],
        hardDeleteSales: [(permissions || []).includes(ePermissions.HardDeleteSales)],
      }),

      allExpensesPermissions: [allExpensesPermissions],
      expenses: this.fb.group({
        createExpenses: [(permissions || []).includes(ePermissions.CreateExpenses)],
        updateExpenses: [(permissions || []).includes(ePermissions.UpdateExpenses)],
        viewExpenses: [(permissions || []).includes(ePermissions.ViewExpenses)],
        softDeleteExpenses: [(permissions || []).includes(ePermissions.SoftDeleteExpenses)],
        hardDeleteExpenses: [(permissions || []).includes(ePermissions.HardDeleteExpenses)],
      }),

      allBanksPermissions: [allBanksPermissions],
      banks: this.fb.group({
        createBanks: [(permissions || []).includes(ePermissions.CreateBanks)],
        updateBanks: [(permissions || []).includes(ePermissions.UpdateBanks)],
        viewBanks: [(permissions || []).includes(ePermissions.ViewBanks)],
        softDeleteBanks: [(permissions || []).includes(ePermissions.SoftDeleteBanks)],
        hardDeleteBanks: [(permissions || []).includes(ePermissions.HardDeleteBanks)],
      }),

      allCustomerAcquisitionsPermissions: [allCustomerAcquisitionsPermissions],
      customeracquisitions: this.fb.group({
        createCustomerAcquisitions: [(permissions || []).includes(ePermissions.CreateCustomerAcquisitions)],
        updateCustomerAcquisitions: [(permissions || []).includes(ePermissions.UpdateCustomerAcquisitions)],
        viewCustomerAcquisitions: [(permissions || []).includes(ePermissions.ViewCustomerAcquisitions)],
        softDeleteCustomerAcquisitions: [(permissions || []).includes(ePermissions.SoftDeleteCustomerAcquisitions)],
        hardDeleteCustomerAcquisitions: [(permissions || []).includes(ePermissions.HardDeleteCustomerAcquisitions)],
      }),

      allInfoBusinessPermissions: [allInfoBusinessPermissions],
      infobusiness: this.fb.group({
        updateInfoBusiness: [(permissions || []).includes(ePermissions.UpdateInfoBusiness)],
        viewInfoBusiness: [(permissions || []).includes(ePermissions.ViewInfoBusiness)],
      }),
    });
  }

  controlInvalid(control: string) {
    return (
      (this.isSubmitted && this.form.get(control)?.untouched && this.form.get(control)?.invalid) ||
      (this.form.get(control)?.invalid && (this.form.get(control)?.dirty || this.form.get(control)?.touched))
    );
  }

  resetDrawer() {
    this.form.reset();
    this.isSubmitted = false;
    this.allPermissionsChecked = false;
  }

  handleClose() {
    this.resetDrawer();
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
