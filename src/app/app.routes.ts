import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'product'
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.routes').then(m => m.ProductRoutes)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>import('./register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: '**',
    redirectTo: 'product'
  }
];
