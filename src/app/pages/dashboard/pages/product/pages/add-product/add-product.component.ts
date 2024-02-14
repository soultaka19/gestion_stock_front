import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
  data = inject(MAT_DIALOG_DATA)
  
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
    this.dialogRef.close(this.addProductForm.value);
  }

}
