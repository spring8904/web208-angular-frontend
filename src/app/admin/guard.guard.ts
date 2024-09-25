import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const guardGuard: CanActivateFn = async (route, state) => {
  const token = localStorage.getItem('token') || '';
  const email = localStorage.getItem('email') || '';
  const router = inject(Router);
  const authServices = inject(AuthService);

  if (!token) {
    router.navigate(['/login-register']);
    return false;
  }

  const res = await authServices.checkIsAdmin(email).toPromise();
  if (!res?.isAdmin) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
