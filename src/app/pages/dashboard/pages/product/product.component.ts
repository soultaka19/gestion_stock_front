import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductListComponent } from './pages/product-list/product-list.component';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatTabsModule, ProductListComponent,],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {}
