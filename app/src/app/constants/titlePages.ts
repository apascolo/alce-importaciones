import { eRoutes } from '@enums/eRoutes';

export type PagesWithTitle =
  | eRoutes.Root
  | eRoutes.Categories
  | eRoutes.Products
  | eRoutes.Users
  | eRoutes.Customers
  | eRoutes.Suppliers;

export const titlePages: Record<PagesWithTitle, string> = {
  [eRoutes.Root]: 'Resumen',
  [eRoutes.Categories]: 'Categorías',
  [eRoutes.Products]: 'Productos',
  [eRoutes.Users]: 'Usuarios',
  [eRoutes.Customers]: 'Clientes',
  [eRoutes.Suppliers]: 'Proveedores',
};
