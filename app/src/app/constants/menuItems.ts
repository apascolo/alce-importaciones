import { titlePages } from '@constants/index';
import { eRoutes } from '@enums/eRoutes';
import { IMenuItem } from '@interfaces/IMenuItem';

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
    path: eRoutes.Users,
    name: titlePages[eRoutes.Users],
    icon: 'team',
  },
  {
    path: eRoutes.Suppliers,
    name: titlePages[eRoutes.Suppliers],
    icon: 'shop',
  },
];
