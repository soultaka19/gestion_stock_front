import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  computed,
  input
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
export class ProductListComponent implements AfterViewInit, OnChanges{
  products = input.required<Product[]>({ alias: 'les_produits' });

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = computed(() => new MatTableDataSource<Product>(this.products()));

  displayedColumns: string[] = [
    'ID_Produit',
    'Nom',
    'PrixUnitaire',
    'ID_Fournisseur',
  ];

  @Output() addProduct = new EventEmitter<string>();

  ngAfterViewInit() {
    this.dataSource().paginator = this.paginator;
    console.log('paginator', this.paginator);
  }

  ngOnChanges(simpleChanges: SimpleChanges) {

    if (simpleChanges['products'] ) {
      this.dataSource().paginator = this.paginator;
    }
  }

  onAddProduct() {
    this.addProduct.emit('add');
  }
}
