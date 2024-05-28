import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { AddProductComponent } from '../add-product/add-product.component';
import { Produit } from '../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ CommonModule, ButtonModule, RatingModule, TagModule, TableModule, MatInputModule,
     MatTableModule, MatPaginatorModule, AddProductComponent, IconFieldModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products = input.required<Produit[]>();
  getSeverity(status: string) {
    switch (status) {
        case 'INSTOCK':
            return 'success';
        case 'LOWSTOCK':
            return 'warning';
        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return 'info';
    }
}
  
}
