import { PagesWithTitle } from '@customTypes/index';
import { eRoutes } from '@enums/routes.enum';

export const titlePages: Record<PagesWithTitle, string> = {
  [eRoutes.Root]: 'Resumen',
  [eRoutes.Categories]: 'Categorías',
  [eRoutes.Products]: 'Productos',
  [eRoutes.Users]: 'Usuarios',
  [eRoutes.Customers]: 'Clientes',
  [eRoutes.Suppliers]: 'Proveedores',
  [eRoutes.Roles]: 'Roles',
  gestionUsuarios: 'Gestión de usuarios',
};
