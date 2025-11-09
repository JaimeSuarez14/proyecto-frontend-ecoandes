import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@shared/services/auth-service';
import { catchError, from, switchMap, throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const refreshToken = authService.getRefreshToken();

  if (['login', 'register', "refresh"].some((route) => req.url.includes(route))) {
    return next(req);
  }

  if (!token) {
    authService.logout();
    return next(req);
  }

  //si el token aun no ha expirado volvemos a enviarlo
  if (!authService.isTokenExpired(token)) {
    const cloneReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloneReq);
  }

  // Refresh token expirado, salimos de la sesion
  if (authService.isTokenExpired(refreshToken)) {
    authService.logout();
    return next(req);
  }

  // Refrescar token y continuar
  return authService.refreshToken()!.pipe(
    switchMap((response) => {
      const newAccessToken = response?.accessToken;
      if (!newAccessToken) {
        authService.logout();
        return next(req); // sin token válido
      }

      const cloneReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${newAccessToken}`,
        },
      });

      return next(cloneReq);
    }),
    catchError(() => {
      authService.logout();
      return next(req);
    })
  );
};

