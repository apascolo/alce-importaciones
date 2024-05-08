import { PagesWithTitle } from '@customTypes/index';
import { eRoutes } from '@enums/eRoutes';

export const titlePages: Record<PagesWithTitle, string> = {
  [eRoutes.Root]: 'Resumen',
  [eRoutes.Categories]: 'Categorías',
  [eRoutes.Products]: 'Productos',
  [eRoutes.Users]: 'Usuarios',
  [eRoutes.Customers]: 'Clientes',
  [eRoutes.Suppliers]: 'Proveedores',
};
