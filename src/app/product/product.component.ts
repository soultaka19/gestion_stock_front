import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { map, tap } from 'rxjs';
import { AddProductComponent } from './add-product/add-product.component';
import { Product } from './models/product.model';
import { ProductListComponent } from './product-list/product-list.component';
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
    MatProgressSpinnerModule,
  ],
  providers: [ProductService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  productSevice = inject(ProductService);
  dialog = inject(MatDialog);
  les_produits = signal<Product[]>([]);

  les_produit$ = toSignal(
    this.productSevice.getProducts().pipe(
      tap((data) => {
        console.log("reponse de l'api produit", data);
        this.les_produits.set(data.data);
      }),
      map((data) => data.data)
    )
  );

  les_fournisseurs = toSignal(
    this.productSevice.getFournisseurs().pipe(
      tap((data) => {
        console.log("reponse de l'api fournisseur", data);
      }),
      map((data) => data.data)
    )
  );

  openDialog() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      data: this.les_fournisseurs(),
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result.Nom) {
        this.addProduct(result);
      }
    });
  }

  //fonction pour ajouter un produit
  addProduct(product: Product) {
    this.productSevice.createProduct(product).subscribe((reponse: any) => {
      if (reponse.status) {
        //mettre a jour la liste des produits
        //ajouter le nouveau produit a la liste au debut
        this.les_produits.update((ancienneListe) => [
          reponse.data,
          ...ancienneListe,
        ]);
        console.log('produit ajouter avec succes', reponse.data);
      } else {
        console.log("erreur lors de l'ajout", reponse);
      }
    });
  }
}
