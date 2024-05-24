//definir une route pour le produit

import { Routes } from "@angular/router";
import { ProductComponent } from "./product.component";

export const ProductRoutes: Routes = [
  {
    path: '',
    component: ProductComponent
  }
]