import { Component, inject } from '@angular/core';
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
import { AuthService } from '../core/authentification/auth.service';

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
export class LoginComponent {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  route = inject(Router);

  loginForm: FormGroup = this.formBuilder.group({
    Login: ['', [Validators.required, Validators.email]],
    MotDePasse: ['', Validators.required],
  });

  incorectIdentifiant = false;

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
            this.route.navigate(['/admin']);
            localStorage.setItem('token', reponse.data);
            this.loginForm.reset();
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
