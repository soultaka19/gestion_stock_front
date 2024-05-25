import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('Utilisateur  connecte?', authService.isLogged());
  if (!authService.isLogged()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
