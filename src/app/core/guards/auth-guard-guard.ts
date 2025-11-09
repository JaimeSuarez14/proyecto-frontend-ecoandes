import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@shared/services/auth-service';


export const authGuardGuard: CanActivateFn = (route, state) => {
  const usuarioLogin = inject(AuthService).currentUserAuth$();
  const router = inject(Router);
  if(usuarioLogin){
    return true;
  }
  return router.createUrlTree(['/login']);
};
