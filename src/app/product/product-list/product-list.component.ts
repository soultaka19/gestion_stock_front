import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, OnChanges, Output, SimpleChanges, ViewChild, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddProductComponent } from '../add-product/add-product.component';
import { Produit } from '../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ CommonModule, MatTableModule, MatPaginatorModule, MatButtonModule, AddProductComponent, MatInputModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements AfterViewInit, OnChanges{
  products = input.required<Produit[]>({ alias: 'les_produits' });

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = computed(() => new MatTableDataSource<Produit>(this.products()));

  displayedColumns: string[] = [
    'ID_Produit',
    'Nom',
    'PrixUnitaire',
    'Fournisseur',
  ];
  //definir le type de displayedColumns du type produit
  

  @Output() addProduct = new EventEmitter<string>();

  ngAfterViewInit() {
    this.dataSource().paginator = this.paginator;
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
