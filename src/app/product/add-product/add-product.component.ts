import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Fournisseur, Produit } from '../models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent  {
  dialogRef = inject(MatDialogRef);
  //declarer le formulaire
  formBuilder = inject(FormBuilder);
  Fournisseurs : Fournisseur[] = inject(MAT_DIALOG_DATA)

  productService = inject(ProductService);
  
  addProductForm: FormGroup = this.formBuilder.group({
    Nom: ['', Validators.required],
    Description: [''],
    PrixUnitaire: ['', Validators.required],
    ID_Fournisseur: [''],
  });
  
  onSubmit() {
    console.log(this.addProductForm.value);
    if (this.addProductForm.invalid) {
      return;
    }
    const newProduit: Produit = {
      Nom: this.addProductForm.value.Nom,
      Description: this.addProductForm.value.Description,
      PrixUnitaire: this.addProductForm.value.PrixUnitaire,
      fournisseur: this.getFournisseurById(this.addProductForm.value.ID_Fournisseur) as Fournisseur,
    }
    this.productService.addProduit(newProduit);
  }

  getFournisseurById(id: number) {
    return this.Fournisseurs.find((fournisseur) => fournisseur.ID_Fournisseur === id);
  }

}
