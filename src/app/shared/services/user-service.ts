import { ApiResponse } from './../../core/model/api-response.model';
import { SessionService } from './utils/session-service';
import { AuthService } from '@shared/services/auth-service';
import { HttpClient } from '@angular/common/http';
import { Directive, inject, Injectable, signal } from '@angular/core';
import { Usuario } from 'app/core/model/Usuario';
import {
  catchError,
  filter,
  finalize,
  firstValueFrom,
  of,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = 'http://localhost:8080/api/user';
  private authService = inject(AuthService);
  private sessionService = inject(SessionService);

  private usuariosSignal = signal<Usuario[]>([]);
  private isLoadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);

  readonly usuarios = this.usuariosSignal.asReadonly();
  readonly isLoading = this.isLoadingSignal.asReadonly();
  readonly errorMessage = this.errorSignal.asReadonly();

  constructor(private http: HttpClient) {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.isLoadingSignal.set(true);
    this.errorSignal.set(null);

    this.http
      .get<Usuario[]>(this.apiUrl)
      .pipe(
        tap((data) => {
          if (Array.isArray(data)) {
            this.usuariosSignal.set(data);
          } else {
            this.usuariosSignal.set([data]);
          }
        }),
        catchError((error) => {
          this.errorSignal.set(error?.message || 'Error al cargar usuarios');
          this.usuariosSignal.set([]);
          return of([]);
        }),
        finalize(() => this.isLoadingSignal.set(false))
      )
      .subscribe();
  }

  refrescarLista(): void {
    this.cargarUsuarios();
  }

  actualizarUsuario(usuario: Usuario) {
    const newUsuario: Usuario = {
      id: usuario.id!,
      nombreCompleto: usuario.nombreCompleto,
      username: usuario.username,
      password: usuario.password,
      email: usuario.email,
      celular: usuario.celular,
      direccion: usuario.direccion,
      fechaRegistro: usuario.fechaRegistro!,
      rol: usuario.rol!,
      estado: usuario.estado!,
    };

    console.log(newUsuario);

    this.isLoadingSignal.set(true);
    this.errorSignal.set(null);
    this.http
      .put<Usuario>(`${this.apiUrl}/${newUsuario.id}`, newUsuario)
      .pipe(
        tap((data) => {
          this.usuariosSignal.update((a) =>
            a.map((alum) => (alum.id! === data.id! ? data : alum))
          );
        }),
        filter((data) => {
          if (data.rol !== this.authService.currentUserAuth$()?.rol) {
            return false;
          }
          return true;
        }),
        tap((data) => {
          console.log(data);

        }),
        catchError((error) => {
          this.errorSignal.set(error?.message || 'Error al Actualizar Perfil');
          return of([]);
        }),
        finalize(() => this.isLoadingSignal.set(false))
      )
      .subscribe();
  }

  async verificarConstraseña(password: string): Promise<boolean> {
    try {
      const id = this.authService.currentUserAuth$()!.id;
      const response = await firstValueFrom(
        this.http.post<ApiResponse>(
          `${this.apiUrl}/validar-password/${id}`,
          password
        )
      );
      return response.status === 'mensaje';
    } catch (error) {
      console.error('Error al verificar contraseña', error);
      return false;
    }
  }

  async actualizarContraseña(password: string): Promise<ApiResponse> {
    try {
      const id = this.authService.currentUserAuth$()!.id;
      const response = await firstValueFrom(
        this.http.post<ApiResponse>(
          `${this.apiUrl}/update-password/${id}`,
          password
        )
      );
      return response;
    } catch (error: unknown) {
      console.error('Error al verificar contraseña', error);
      return {status: 'error' , message:"Error al verificar contraseña "+ error};
    }
  }
}
