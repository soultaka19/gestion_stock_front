import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { SidebarService } from "./services/sidebar.service";

export const dashboardRoutes : Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'product',
        loadComponent: () => import('./pages/product/product.component').then(m => m.ProductComponent),
      },
    ],
    providers:[SidebarService],
  }

]
