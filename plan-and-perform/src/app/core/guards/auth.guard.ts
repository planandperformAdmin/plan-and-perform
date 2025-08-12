import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificăm dacă există user logat
  const user = await authService.getUser();

  if (user) {
    return true; // acces permis
  }

  // Dacă nu e logat → redirect la login
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
