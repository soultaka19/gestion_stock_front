import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { ProductService } from "./pages/product/product.service";
import { SidebarService } from "./services/sidebar.service";

export const dashboardRoutes : Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'product',
        loadComponent: () => import('./pages/product/product.component').then(m => m.ProductComponent),
        providers:[ProductService]
      },
    ],
    providers:[SidebarService],
  }

]
