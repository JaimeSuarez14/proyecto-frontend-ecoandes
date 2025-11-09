import { inject, Injectable, signal } from '@angular/core';
import { UserAuthenticate, Usuario, UsuarioResponse } from '../../core/model/Usuario';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, Observable, of, tap } from 'rxjs';
import { DecodedToken } from 'app/core/model/decoded.model';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/auth';
  private router = inject(Router);

  private usuariosSignal = signal<Usuario[]>([]);
  private currentUser = signal<Usuario | null>(null);
  private isLoadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);

  readonly usuarios = this.usuariosSignal.asReadonly();
  readonly isLoading = this.isLoadingSignal.asReadonly();
  readonly errorMessage = this.errorSignal.asReadonly();
  readonly currentUserAuth$ = this.currentUser.asReadonly();

  constructor(private http: HttpClient) {
    if(this.currentUserAuth$()===null){
      this.currentUser.set(this.getDecodedToken() || null);
    }
  }

  crearUsuario(nuevoUsuario: Usuario): void {
    this.isLoadingSignal.set(true);
    this.errorSignal.set(null);
    this.http
      .post<{ mensaje?: string; error?: string }>(`${this.apiUrl}/register`, nuevoUsuario)
      .pipe(
        tap((respuesta) => {
          if (respuesta.mensaje) {
            console.log({ type: 'success', text: respuesta.mensaje });
          } else if (respuesta.error) {
            this.errorSignal.set(respuesta.error);
          }
        }),
        catchError((error) => {
          const mensaje =
            error?.error?.message || // ← si es ApiResponse
            error?.message || // ← fallback de Angular
            'Error inesperado al crear usuario';

          this.errorSignal.set(mensaje);
          return of(null);
        }),
        finalize(() => this.isLoadingSignal.set(false))
      )
      .subscribe();
  }

  login(password: string, username: string) {
    this.isLoadingSignal.set(true);
    this.errorSignal.set(null);
    this.http
      .post<UsuarioResponse>(`${this.apiUrl}/login`,{password, username}  )
      .pipe(
        tap( ApiResponse => {
          if (ApiResponse !== null) {
            localStorage.setItem('token', ApiResponse.accessToken);
            localStorage.setItem('refreshToken', ApiResponse.refreshToken)
            const usuarioAuth = this.getDecodedToken();
            this.currentUser.set(usuarioAuth);
          } else {
            this.errorSignal.set('Hubo un error en el servicio vuelve intentarlo');
          }
        }),
        catchError((error) => {
          const mensaje =
            error?.error?.message || // ← si es ApiResponse
            error?.message || // ← fallback de Angular
            'Error inesperado al iniciar sesion';

          this.errorSignal.set(mensaje);
          return of(null);
        }),
        finalize(() => this.isLoadingSignal.set(false))
      )
      .subscribe();
  }

  private getDecodedToken(): Usuario | null {
    const token = localStorage.getItem('token');
    if (!token){
      this.logout();
      return null
    };
    try {
      const dce = jwtDecode<Usuario>(token);
      return {
        email: dce.email,
        rol: dce.rol,
        username: dce.username,
        nombreCompleto: dce.nombreCompleto,
        direccion: dce.direccion,
        estado: dce.estado,
        password: "*******",
        id: dce.id,
        celular: dce.celular,
        fechaRegistro: dce.fechaRegistro,

      }
    } catch (error) {
      console.error('Error decodificando token', error);
      return null;
    }
  }

  getRefreshToken(): string | null {
    return localStorage.getItem("refreshToken");
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  isTokenExpired(token: string |null): boolean {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log(payload.exp);
      console.log(Date.now() / 1000);


      return payload.exp < Date.now() / 1000;
    } catch (error) {
      return true;
    }
  }


  /** 🔐 Comprueba si el usuario tiene un rol específico */
  hasRole(role: string): boolean {
    const decoded = this.getDecodedToken();
    return decoded?.rol?.includes(role) ?? false;
  }

  refreshToken(): Observable<UsuarioResponse | null> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken || this.isTokenExpired(refreshToken)) {
      this.logout();
      return of(null);
    }

    return this.http.post<UsuarioResponse>(`${this.apiUrl}/refresh`,
      {},{headers: {Authorization: `Bearer ${refreshToken}`,},})
      .pipe(
      tap((ApiResponse) => {
        if (ApiResponse) {
          localStorage.setItem('token', ApiResponse.accessToken);
          //Ya no es necesario volver a guardar el refresh token en localStorage porque solo sse genera una vez y dura un tiempo solo sirve, como enlace para generar el token nuevo
          // localStorage.setItem('refreshToken', ApiResponse.refreshToken);
          const usuarioAuth = this.getDecodedToken();
          this.currentUser.set(usuarioAuth);
        }
      }),
      catchError((error) => {
        this.errorSignal.set(error?.error?.message || 'Error al refrescar sesión');
        return of(null);
      }),
      finalize(() => this.isLoadingSignal.set(false))
    );
  }


  private clearSession(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    this.currentUser.set(null);
    this.router.navigate(['/admin/login']);
  }

  logout(): void {
    // codigo pendiente
    console.log('User logged out');
    this.clearSession();
  }

  actualizarPerfil(usuario: Usuario){
    this.currentUser.set(usuario || null);
    this.router.navigate(['/admin/perfil-login']);

  }
}
