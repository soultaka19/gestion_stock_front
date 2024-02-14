import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Product } from '../../models/product.model';
import { AddProductComponent } from '../add-product/add-product.component';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    AddProductComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})


export class ProductListComponent  {
  //@Input({ required: true }) products!: Product[];
  products = input.required<Product[]>({alias: 'les_produits'});

  @Output() addProduct = new EventEmitter<string>();



  onAddProduct() {
    this.addProduct.emit('add');
  }
}

