import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guardGuard: CanActivateFn = async (route, state) => {
  const token = localStorage.getItem('token') || '';
  const router = inject(Router);

  if (!token) {
    router.navigate(['/login-register']);
    return false;
  }
  return true;
};
