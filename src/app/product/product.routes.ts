//definir une route pour le produit

import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "../layout/admin-layout.component";
import { ProductComponent } from "./product.component";

export const ProductRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'product'
  },
  {
    path: 'product',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: ProductComponent}
    ]
  },
]
