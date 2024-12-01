import { titlePages } from '@constants/index';
import { eRoutes } from '@enums/routes.enum';
import { IMenuItem } from '@interfaces/menu-item.interface';

export const menuItems: IMenuItem[] = [
  {
    path: eRoutes.Root,
    name: titlePages[eRoutes.Root],
    icon: 'dashboard',
  },
  {
    path: eRoutes.Products,
    name: titlePages[eRoutes.Products],
    icon: 'inbox',
  },
  {
    name: titlePages['gestionUsuarios'],
    icon: 'team',
    children: [
      {
        path: eRoutes.Users,
        name: titlePages[eRoutes.Users],
      },
      {
        path: eRoutes.Roles,
        name: titlePages[eRoutes.Roles],
      },
    ],
  },
  {
    path: eRoutes.Suppliers,
    name: titlePages[eRoutes.Suppliers],
    icon: 'shop',
  },
];
