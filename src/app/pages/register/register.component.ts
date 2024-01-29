import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; // Add this import
import { MatInputModule } from '@angular/material/input'; // Add this import
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Entreprise } from '../../core/models/entreprise.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatToolbarModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  inscriptionForm!: FormGroup;

  entrepriseForm!: FormGroup;
  abonnementForm!: FormGroup;
  utilisateurForm!: FormGroup;

  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.initInscriptionForm();
  }

  initInscriptionForm() {
    this.entrepriseForm = this.formBuilder.group({
      Nom: ['', Validators.required],
      Description: [''],
    });
    const dateDebutAbonnement = new Date();
    const dateFinAbonnement = new Date();
    dateFinAbonnement.setMonth(dateFinAbonnement.getMonth() + 1);
    this.abonnementForm = this.formBuilder.group({
      ID_Abonnement: [1, Validators.required],
      type: ['freemium', Validators.required],
      Date_Debut: [{ value: dateDebutAbonnement, disabled: true }],
      Date_Fin: [{ value: dateFinAbonnement, disabled: true }],
    });

    this.utilisateurForm = this.formBuilder.group({
      Nom: ['', Validators.required],
      Login: ['', Validators.email],
      MotDePasse: ['', Validators.required],
      ID_Profil: [1, Validators.required],
    });

    this.inscriptionForm = this.formBuilder.group({
      entreprise: this.entrepriseForm,
      abonnement: this.abonnementForm,
      utilisateur: this.utilisateurForm,
    });
  }

  onSubmit() {
    if (this.inscriptionForm.invalid) {
      return;
    }
    const entreprise:Entreprise = this.inscriptionForm.value.entreprise;
    const utilisateur = this.inscriptionForm.value.utilisateur;
    const abonnement = this.inscriptionForm.value.abonnement;

    this.authService.inscription(utilisateur, entreprise, abonnement)
    .subscribe({
      next: (reponse : any) => {
        if (reponse.status) {
          //vider le formulaire
          this.inscriptionForm.reset();
          console.log('Inscription reussie', reponse);
        } else {
          console.error('Erreur d\'inscription:', reponse);
        }
      },
      error: (err) => {
        console.error('Erreur lors de l\'inscription', err);
      },
    });
  }
}
