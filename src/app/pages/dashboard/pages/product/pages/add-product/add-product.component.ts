import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    MatDialogModule,
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
  //declarer le formulaire
  addProductForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
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
  }

}
