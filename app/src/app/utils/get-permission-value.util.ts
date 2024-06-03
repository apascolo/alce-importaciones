import { ePermissions } from '@enums/permissions.enum';

export const getPermissionValue = (key: string): ePermissions | undefined => {
  switch (key) {
    case 'createUsers':
      return ePermissions.CreateUsers;
    case 'updateUsers':
      return ePermissions.UpdateUsers;
    case 'viewUsers':
      return ePermissions.ViewUsers;
    case 'softDeleteUsers':
      return ePermissions.SoftDeleteUsers;
    case 'hardDeleteUsers':
      return ePermissions.HardDeleteUsers;

    case 'createSuppliers':
      return ePermissions.CreateSuppliers;
    case 'updateSuppliers':
      return ePermissions.UpdateSuppliers;
    case 'viewSuppliers':
      return ePermissions.ViewSuppliers;
    case 'softDeleteSuppliers':
      return ePermissions.SoftDeleteSuppliers;
    case 'hardDeleteSuppliers':
      return ePermissions.HardDeleteSuppliers;

    case 'createProducts':
      return ePermissions.CreateProducts;
    case 'updateProducts':
      return ePermissions.UpdateProducts;
    case 'viewProducts':
      return ePermissions.ViewProducts;
    case 'softDeleteProducts':
      return ePermissions.SoftDeleteProducts;
    case 'hardDeleteProducts':
      return ePermissions.HardDeleteProducts;

    case 'createCustomers':
      return ePermissions.CreateCustomers;
    case 'updateCustomers':
      return ePermissions.UpdateCustomers;
    case 'viewCustomers':
      return ePermissions.ViewCustomers;
    case 'softDeleteCustomers':
      return ePermissions.SoftDeleteCustomers;
    case 'hardDeleteCustomers':
      return ePermissions.HardDeleteCustomers;

    case 'createSales':
      return ePermissions.CreateSales;
    case 'updateSales':
      return ePermissions.UpdateSales;
    case 'viewSales':
      return ePermissions.ViewSales;
    case 'softDeleteSales':
      return ePermissions.SoftDeleteSales;
    case 'hardDeleteSales':
      return ePermissions.HardDeleteSales;

    case 'createExpenses':
      return ePermissions.CreateExpenses;
    case 'updateExpenses':
      return ePermissions.UpdateExpenses;
    case 'viewExpenses':
      return ePermissions.ViewExpenses;
    case 'softDeleteExpenses':
      return ePermissions.SoftDeleteExpenses;
    case 'hardDeleteExpenses':
      return ePermissions.HardDeleteExpenses;

    case 'createBanks':
      return ePermissions.CreateBanks;
    case 'updateBanks':
      return ePermissions.UpdateBanks;
    case 'viewBanks':
      return ePermissions.ViewBanks;
    case 'softDeleteBanks':
      return ePermissions.SoftDeleteBanks;
    case 'hardDeleteBanks':
      return ePermissions.HardDeleteBanks;

    case 'createCustomerAcquisitions':
      return ePermissions.CreateCustomerAcquisitions;
    case 'updateCustomerAcquisitions':
      return ePermissions.UpdateCustomerAcquisitions;
    case 'viewCustomerAcquisitions':
      return ePermissions.ViewCustomerAcquisitions;
    case 'softDeleteCustomerAcquisitions':
      return ePermissions.SoftDeleteCustomerAcquisitions;
    case 'hardDeleteCustomerAcquisitions':
      return ePermissions.HardDeleteCustomerAcquisitions;

    case 'createRoles':
      return ePermissions.CreateRoles;
    case 'updateRoles':
      return ePermissions.UpdateRoles;
    case 'viewRoles':
      return ePermissions.ViewRoles;
    case 'deleteRoles':
      return ePermissions.DeleteRoles;

    case 'createBrands':
      return ePermissions.CreateBrands;
    case 'updateBrands':
      return ePermissions.UpdateBrands;
    case 'viewBrands':
      return ePermissions.ViewBrands;
    case 'deleteBrands':
      return ePermissions.DeleteBrands;

    case 'createCategories':
      return ePermissions.CreateCategories;
    case 'updateCategories':
      return ePermissions.UpdateCategories;
    case 'viewCategories':
      return ePermissions.ViewCategories;
    case 'deleteCategories':
      return ePermissions.DeleteCategories;

    case 'updateInfoBusiness':
      return ePermissions.UpdateInfoBusiness;
    case 'viewInfoBusiness':
      return ePermissions.ViewInfoBusiness;

    default:
      return;
  }
};
