import { PagesWithTitle } from '@customTypes/index';

export interface IMenuItem {
  path?: PagesWithTitle;
  name: string;
  icon?: string;
  open?: boolean;
  children?: IMenuItem[];
}
