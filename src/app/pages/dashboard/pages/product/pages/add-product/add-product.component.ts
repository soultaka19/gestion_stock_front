import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

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
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit {
  dialogRef = inject(MatDialogRef);
  //declarer le formulaire
  addProductForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  ngOnInit() {
    this.addProductForm = this.formBuilder.group({
      Nom: ['', Validators.required],
      Description: [''],
      PrixUnitaire: ['', Validators.required],
      ID_Fournisseur: [''],
    });
  }
  
  onSubmit() {
    console.log(this.addProductForm.value);
    if (this.addProductForm.invalid) {
      return;
    }
    this.dialogRef.close(this.addProductForm.value);
  }

}
