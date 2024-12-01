import { FormControl, FormGroup } from '@angular/forms';
import { ePermissions } from '@enums/permissions.enum';
import { IFullAudited } from '@interfaces/full-audited.interface';
import { IIdentification } from '@interfaces/identification.interface';

export interface IRole extends IIdentification, IFullAudited {
  name: string;
  nameLowercase: string;
  permissions: ePermissions[];
  users: number;
}

export interface IRoleCreate {
  name: string;
  permissions: ePermissions[];
}

export interface IRoleUpdate {
  name: string;
  permissions: ePermissions[];
}

export interface IRoleRequest {
  role: IRoleCreate | IRoleUpdate;
  authToken: string;
}

export interface IRoleControls {
  name: FormControl<string | null>;

  allUsersPermissions: FormControl<boolean | null>;
  users: FormGroup<{
    createUsers: FormControl<boolean | null>;
    updateUsers: FormControl<boolean | null>;
    viewUsers: FormControl<boolean | null>;
    softDeleteUsers: FormControl<boolean | null>;
    hardDeleteUsers: FormControl<boolean | null>;
  }>;

  allSuppliersPermissions: FormControl<boolean | null>;
  suppliers: FormGroup<{
    createSuppliers: FormControl<boolean | null>;
    updateSuppliers: FormControl<boolean | null>;
    viewSuppliers: FormControl<boolean | null>;
    softDeleteSuppliers: FormControl<boolean | null>;
    hardDeleteSuppliers: FormControl<boolean | null>;
  }>;

  allCustomersPermissions: FormControl<boolean | null>;
  customers: FormGroup<{
    createCustomers: FormControl<boolean | null>;
    updateCustomers: FormControl<boolean | null>;
    viewCustomers: FormControl<boolean | null>;
    softDeleteCustomers: FormControl<boolean | null>;
    hardDeleteCustomers: FormControl<boolean | null>;
  }>;

  allRolesPermissions: FormControl<boolean | null>;
  roles: FormGroup<{
    createRoles: FormControl<boolean | null>;
    updateRoles: FormControl<boolean | null>;
    viewRoles: FormControl<boolean | null>;
    deleteRoles: FormControl<boolean | null>;
  }>;

  allCategoriesPermissions: FormControl<boolean | null>;
  categories: FormGroup<{
    createCategories: FormControl<boolean | null>;
    updateCategories: FormControl<boolean | null>;
    viewCategories: FormControl<boolean | null>;
    deleteCategories: FormControl<boolean | null>;
  }>;

  allBrandsPermissions: FormControl<boolean | null>;
  brands: FormGroup<{
    createBrands: FormControl<boolean | null>;
    updateBrands: FormControl<boolean | null>;
    viewBrands: FormControl<boolean | null>;
    deleteBrands: FormControl<boolean | null>;
  }>;

  allProductsPermissions: FormControl<boolean | null>;
  products: FormGroup<{
    createProducts: FormControl<boolean | null>;
    updateProducts: FormControl<boolean | null>;
    viewProducts: FormControl<boolean | null>;
    softDeleteProducts: FormControl<boolean | null>;
    hardDeleteProducts: FormControl<boolean | null>;
  }>;

  allSalesPermissions: FormControl<boolean | null>;
  sales: FormGroup<{
    createSales: FormControl<boolean | null>;
    updateSales: FormControl<boolean | null>;
    viewSales: FormControl<boolean | null>;
    softDeleteSales: FormControl<boolean | null>;
    hardDeleteSales: FormControl<boolean | null>;
  }>;

  allExpensesPermissions: FormControl<boolean | null>;
  expenses: FormGroup<{
    createExpenses: FormControl<boolean | null>;
    updateExpenses: FormControl<boolean | null>;
    viewExpenses: FormControl<boolean | null>;
    softDeleteExpenses: FormControl<boolean | null>;
    hardDeleteExpenses: FormControl<boolean | null>;
  }>;

  allBanksPermissions: FormControl<boolean | null>;
  banks: FormGroup<{
    createBanks: FormControl<boolean | null>;
    updateBanks: FormControl<boolean | null>;
    viewBanks: FormControl<boolean | null>;
    softDeleteBanks: FormControl<boolean | null>;
    hardDeleteBanks: FormControl<boolean | null>;
  }>;

  allCustomerAcquisitionsPermissions: FormControl<boolean | null>;
  customeracquisitions: FormGroup<{
    createCustomerAcquisitions: FormControl<boolean | null>;
    updateCustomerAcquisitions: FormControl<boolean | null>;
    viewCustomerAcquisitions: FormControl<boolean | null>;
    softDeleteCustomerAcquisitions: FormControl<boolean | null>;
    hardDeleteCustomerAcquisitions: FormControl<boolean | null>;
  }>;

  allInfoBusinessPermissions: FormControl<boolean | null>;
  infobusiness: FormGroup<{
    updateInfoBusiness: FormControl<boolean | null>;
    viewInfoBusiness: FormControl<boolean | null>;
  }>;
}

export interface IRoleColumn {
  createdAt: string;
  name: string;
  users: number;
  key: string;
}
