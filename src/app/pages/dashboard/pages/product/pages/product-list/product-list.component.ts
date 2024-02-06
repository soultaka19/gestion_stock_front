import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddProductComponent } from '../add-product/add-product.component';

export interface PeriodicElement {
  nom: string;
  position: number;
  quantite: number;
  prixUnitaire: string;
  fournisseur: string;
  niveauStock: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, nom: 'Hydrogen', quantite: 1.0079, prixUnitaire: 'H' , fournisseur: 'A', niveauStock: 'faible'},
  { position: 2, nom: 'Helium', quantite: 4.0026, prixUnitaire: 'He', fournisseur: 'B', niveauStock: 'moyen'},
  { position: 3, nom: 'Lithium', quantite: 6.941, prixUnitaire: 'Li', fournisseur: 'C', niveauStock: 'elevé'},
  { position: 4, nom: 'Beryllium', quantite: 9.0122, prixUnitaire: 'Be', fournisseur: 'D', niveauStock: 'faible'},
  { position: 5, nom: 'Boron', quantite: 10.811, prixUnitaire: 'B' , fournisseur: 'E', niveauStock: 'moyen'},
  { position: 6, nom: 'Carbon', quantite: 12.0107, prixUnitaire: 'C' , fournisseur: 'F', niveauStock: 'elevé'},
  { position: 7, nom: 'Nitrogen', quantite: 14.0067, prixUnitaire: 'N', fournisseur: 'G', niveauStock: 'faible'},
  { position: 8, nom: 'Oxygen', quantite: 15.9994, prixUnitaire: 'O', fournisseur: 'H', niveauStock: 'moyen'},
  { position: 9, nom: 'Fluorine', quantite: 18.9984, prixUnitaire: 'F', fournisseur: 'I', niveauStock: 'elevé'},
  { position: 10, nom: 'Neon', quantite: 20.1797, prixUnitaire: 'Ne' , fournisseur: 'J', niveauStock: 'faible'},
];


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, AddProductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements AfterViewInit {
  private apiUrl = 'http://localhost/gestion_stock/taf/';

  http = inject(HttpClient);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog) {
    this.getProductList();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = [
    'position',
    'nom',
    'quantite',
    'prixUnitaire',
    'fournisseur',
    'niveauStock',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  openDialog() {
    const dialogRef = this.dialog.open(AddProductComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getProductList() {
    this.http.get(`${this.apiUrl}produit/get`).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  
}
