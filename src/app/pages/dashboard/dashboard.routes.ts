import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

export const dashboardRoutes : Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'profil',
        loadComponent: () => import('./pages/profil/profil.component').then(m => m.ProfilComponent),
      },
      {
        path: 'product',
        loadChildren: () => import('./pages/product/product.routes').then(m => m.productRoutes)
      }
    ]
  }

]