import { Routes } from '@angular/router';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { eRoutes } from '@enums/routes.enum';

const redirectToLogin = () => redirectUnauthorizedTo(['/auth/login']);
const redirectToDashboard = () => redirectLoggedInTo(['/']);

export const routes: Routes = [
  {
    path: eRoutes.Root,
    loadComponent: () =>
      import('./pages/drawer.component').then((m) => m.DrawerComponent),
    ...canActivate(redirectToLogin),
    children: [
      {
        path: eRoutes.Root,
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        ...canActivate(redirectToLogin),
      },
      {
        path: eRoutes.Products,
        loadComponent: () =>
          import('./pages/products/products.component').then(
            (m) => m.ProductsComponent
          ),
        ...canActivate(redirectToLogin),
      },
      {
        path: eRoutes.Categories,
        loadComponent: () =>
          import('./pages/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
        ...canActivate(redirectToLogin),
      },
      {
        path: eRoutes.Users,
        loadComponent: () =>
          import('./pages/users/users.component').then((m) => m.UsersComponent),
        ...canActivate(redirectToLogin),
      },
      {
        path: eRoutes.Operations,
        loadComponent: () =>
          import('./pages/operations/operations.component').then(
            (m) => m.OperationsComponent
          ),
        ...canActivate(redirectToLogin),
      },
      {
        path: eRoutes.Suppliers,
        loadComponent: () =>
          import('./pages/suppliers/suppliers.component').then(
            (m) => m.SuppliersComponent
          ),
        ...canActivate(redirectToLogin),
      },
    ],
  },
  {
    path: eRoutes.Auth,
    loadComponent: () =>
      import('./auth/auth.component').then((m) => m.AuthComponent),
    ...canActivate(redirectToDashboard),
    children: [
      {
        path: eRoutes.Login,
        loadComponent: () =>
          import('./auth/login/login.component').then((m) => m.LoginComponent),
        ...canActivate(redirectToDashboard),
      },
      {
        path: eRoutes.Root,
        pathMatch: 'full',
        redirectTo: 'login',
      },
    ],
  },
  {
    path: eRoutes.Root,
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
