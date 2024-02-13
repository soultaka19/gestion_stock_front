import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Observable, map, tap } from 'rxjs';
import { Product } from './models/product.model';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    ProductListComponent,
    MatDialogModule,
    AddProductComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  productSevice = inject(ProductService);
  dialog = inject(MatDialog);
  //affecte les produits a une variable qui sera utilise dans un input
  les_produits$: Observable<Product[]> = this.productSevice.getProducts().pipe(
    tap((data) => console.log("reponse de l'api produit", data)),
    map((data) => data.data)
  );
  
  products = toSignal(this.les_produits$, {initialValue: []});

  openDialog() {
    const dialogRef = this.dialog.open(AddProductComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${JSON.stringify(result, null, 2)}`);
      this.addProduct(result);
    });
  }

  //fonction pour ajouter un produit
  addProduct(product: Product) {
    this.productSevice.createProduct(product).subscribe((data) => {
      console.log('produit ajoute', data);
      //mettre a jour la liste des produits
      this.les_produits$ = this.productSevice.getProducts().pipe(
        tap((data) => console.log("reponse de l'api produit", data)),
        map((data) => data.data)
      );
    });
    console.log('ajouter un produit');
  }


}
