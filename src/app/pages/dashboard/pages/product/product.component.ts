import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { tap } from 'rxjs';
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
  les_produits = signal<Product[]>([]);

  private les_produit$ = toSignal(
    this.productSevice.getProducts().pipe(
      tap((data) => {
        console.log("reponse de l'api produit", data);
        this.les_produits.set(data.data);
      })
    )
  );

  openDialog() {
    const dialogRef = this.dialog.open(AddProductComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${JSON.stringify(result, null, 2)}`);
      this.addProduct(result);
    });
  }

  //fonction pour ajouter un produit
  addProduct(product: Product) {
    this.productSevice.createProduct(product).subscribe((reponse: any) => {
      if (reponse.status) {
        //mettre a jour la liste des produits
        this.les_produits.update((ancienneListe) => [...ancienneListe,product])
        console.log('produit ajouter avec succes', reponse.data);
      } else {
        console.log("erreur lors de l'ajout", reponse);
      }
    });
  }
}
