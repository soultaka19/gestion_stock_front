import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild, input } from '@angular/core';
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



export class ProductListComponent implements OnInit, AfterViewInit {
  products = input.required<Product[]>({alias: 'les_produits'});

  displayedColumns: string[] = ['ID_Produit', 'Nom', 'PrixUnitaire', 'ID_Fournisseur'];

  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.products());
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  @Output() addProduct = new EventEmitter<string>();



  onAddProduct() {
    this.addProduct.emit('add');
  }
}


