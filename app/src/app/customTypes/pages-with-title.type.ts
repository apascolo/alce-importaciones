import { eRoutes } from '@enums/routes.enum';

export type PagesWithTitle =
  | eRoutes.Root
  | eRoutes.Categories
  | eRoutes.Products
  | eRoutes.Users
  | eRoutes.Customers
  | eRoutes.Suppliers
  | eRoutes.Roles
  | 'gestionUsuarios';
