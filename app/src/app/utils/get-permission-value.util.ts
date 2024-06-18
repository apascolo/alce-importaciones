import { ePermissions } from '@enums/permissions.enum';

export const getPermissionValue = (key: string): ePermissions | undefined => {
  switch (key) {
    case 'createUsers':
      return ePermissions.CreateUsers;
    case 'updateUsers':
      return ePermissions.UpdateUsers;
    case 'viewUsers':
      return ePermissions.ViewUsers;
    case 'deleteUsers':
      return ePermissions.DeleteUsers;

    case 'createSuppliers':
      return ePermissions.CreateSuppliers;
    case 'updateSuppliers':
      return ePermissions.UpdateSuppliers;
    case 'viewSuppliers':
      return ePermissions.ViewSuppliers;
    case 'deleteSuppliers':
      return ePermissions.DeleteSuppliers;

    case 'createProducts':
      return ePermissions.CreateProducts;
    case 'updateProducts':
      return ePermissions.UpdateProducts;
    case 'viewProducts':
      return ePermissions.ViewProducts;
    case 'deleteProducts':
      return ePermissions.DeleteProducts;

    case 'createCustomers':
      return ePermissions.CreateCustomers;
    case 'updateCustomers':
      return ePermissions.UpdateCustomers;
    case 'viewCustomers':
      return ePermissions.ViewCustomers;
    case 'deleteCustomers':
      return ePermissions.DeleteCustomers;

    case 'createSales':
      return ePermissions.CreateSales;
    case 'updateSales':
      return ePermissions.UpdateSales;
    case 'viewSales':
      return ePermissions.ViewSales;
    case 'deleteSales':
      return ePermissions.DeleteSales;

    case 'createExpenses':
      return ePermissions.CreateExpenses;
    case 'updateExpenses':
      return ePermissions.UpdateExpenses;
    case 'viewExpenses':
      return ePermissions.ViewExpenses;
    case 'deleteExpenses':
      return ePermissions.DeleteExpenses;

    case 'createBanks':
      return ePermissions.CreateBanks;
    case 'updateBanks':
      return ePermissions.UpdateBanks;
    case 'viewBanks':
      return ePermissions.ViewBanks;
    case 'deleteBanks':
      return ePermissions.DeleteBanks;

    case 'createCustomerAcquisitions':
      return ePermissions.CreateCustomerAcquisitions;
    case 'updateCustomerAcquisitions':
      return ePermissions.UpdateCustomerAcquisitions;
    case 'viewCustomerAcquisitions':
      return ePermissions.ViewCustomerAcquisitions;
    case 'deleteCustomerAcquisitions':
      return ePermissions.DeleteCustomerAcquisitions;

    case 'createRoles':
      return ePermissions.CreateRoles;
    case 'updateRoles':
      return ePermissions.UpdateRoles;
    case 'viewRoles':
      return ePermissions.ViewRoles;
    case 'deleteRoles':
      return ePermissions.DeleteRoles;

    case 'createStores':
      return ePermissions.CreateStores;
    case 'updateStores':
      return ePermissions.UpdateStores;
    case 'viewStores':
      return ePermissions.ViewStores;
    case 'deleteStores':
      return ePermissions.DeleteStores;

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
