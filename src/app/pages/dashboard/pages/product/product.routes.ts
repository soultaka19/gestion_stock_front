import { Routes } from "@angular/router";

export const productRoutes : Routes = [
  {
    path: '',
    loadComponent: () => import('./product.component').then(m => m.ProductComponent),
  },
  {
    path: 'add-product',
    loadComponent: () => import('./pages/add-product/add-product.component').then(m => m.AddProductComponent),
  },
  {
    path: 'product-list',
    loadComponent: () => import('./pages/product-list/product-list.component').then(m => m.ProductListComponent),
  }
]
