import { menuItems } from '../constants/menu-items.interface';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { eRoutes } from '@enums/routes.enum';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { AuthService } from '@services/auth.service';
import { PagesWithTitle } from '@customTypes/index';
import { titlePages } from '@constants/index';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzDrawerModule,
    NzLayoutModule,
    NzMenuModule,
    RouterModule,
    NzIconModule,
    NzAvatarModule,
    NzDropDownModule,
  ],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DrawerComponent implements OnInit {
  public year = new Date().getFullYear();
  public eRoutes = eRoutes;
  public title: string;
  public titlePages = titlePages;
  public menuItems = menuItems;

  private router = inject(Router);
  private authService = inject(AuthService);
  private urlRoute: PagesWithTitle;

  public ngOnInit(): void {
    this.setTitle();
    this.checkMenuItemOpen();
  }

  private checkMenuItemOpen() {
    for (const menuItem of this.menuItems) {
      const { children } = menuItem;
      if (children?.length) {
        const open = children.some((c) => c.path === this.urlRoute);
        Object.assign(menuItem, { open });
      }
    }
  }

  public setTitle(route?: PagesWithTitle) {
    this.urlRoute = this.router.url.split('/')[1] as PagesWithTitle;
    const title: PagesWithTitle = route ?? this.urlRoute;

    this.title = this.titlePages[title];
  }

  public logout() {
    this.authService
      .logout()
      .then(() =>
        this.router.navigateByUrl(eRoutes.Auth, { replaceUrl: true })
      );
  }
}
