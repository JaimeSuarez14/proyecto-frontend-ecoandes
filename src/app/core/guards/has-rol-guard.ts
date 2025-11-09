import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@shared/services/auth-service';

export const hasRolGuard = (requiredRoles: string[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const rolUser = authService.currentUserAuth$();
    if(rolUser===null){
      return false;
    }
    const hasRol =  requiredRoles.includes(rolUser.rol!);
    return hasRol;
  };
};
