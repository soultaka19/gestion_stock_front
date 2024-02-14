import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  incorectIdentifiant = false;

  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  route = inject(Router);

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      Login: ['', [Validators.required, Validators.email]],
      MotDePasse: ['', Validators.required],
    });
  }
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService
      .login(this.loginForm.value.Login, this.loginForm.value.MotDePasse)
      .subscribe(
        (reponse) => {
          console.log('Reponse du backend', reponse);
          if (reponse.status) {
            //vider le formulaire
            this.loginForm.reset();
            this.route.navigate(['/dashboard']);
          } else {
            this.incorectIdentifiant = true;
          }
        },
        (err) => {
          console.error('Une erreur est survenue lors de la connexion', err);
        }
      );
  }

  onRegister() {
    this.route.navigate(['/register']);
  }
}
