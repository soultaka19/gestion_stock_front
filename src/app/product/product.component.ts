import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { Observable } from 'rxjs';
import { AddProductComponent } from './add-product/add-product.component';
import { Produit } from './models/product.model';
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
export class ProductComponent implements OnInit {
  productSevice = inject(ProductService);

  produits$: Observable<Produit[]> = this.productSevice.produits$;

  loading$: Observable<boolean> = this.productSevice.loading$;

  les_produits : Signal<Produit[]> = toSignal(this.produits$, {initialValue: []});

  ngOnInit(): void {
    this.productSevice.getProductsFromApi();
  }

}
