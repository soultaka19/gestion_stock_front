import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>import('./pages/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'dashboard',
    //canActivate: [dasboardGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then((m) => m.dashboardRoutes ),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  }
];
