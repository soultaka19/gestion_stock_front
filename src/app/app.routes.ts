import { Routes } from '@angular/router';
import { AuthGuard } from './core/authentification/auth.guard';

export const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin'
  },
  {
    path: 'admin',
    loadChildren: () => import('./product/product.routes').then(m => m.ProductRoutes),
    canActivate: [AuthGuard]
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
    redirectTo: 'admin'
  }
] ;
