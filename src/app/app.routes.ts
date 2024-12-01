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
