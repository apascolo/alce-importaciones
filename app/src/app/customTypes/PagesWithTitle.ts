import { eRoutes } from '@enums/index';

export type PagesWithTitle =
  | eRoutes.Root
  | eRoutes.Categories
  | eRoutes.Products
  | eRoutes.Users
  | eRoutes.Customers
  | eRoutes.Suppliers;
