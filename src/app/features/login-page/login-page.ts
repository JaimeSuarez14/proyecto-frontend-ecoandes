import { SessionService } from '../../shared/services/utils/session-service';
import { Component, inject, signal, computed, effect } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth-service';
import { noSpacesValidator } from '../../shared/validators/noSpacesValidator';
import { Router, RouterLink } from '@angular/router';
import { SpinerCargando } from "@shared/components/spiner-cargando/spiner-cargando";

interface Message {
  type: 'success' | 'error';
  text: string;
}

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, SpinerCargando, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private fb = inject(FormBuilder);
  public authService = inject(AuthService);
  private router = inject(Router);
  private SessionService = inject(SessionService)

  // Signals
  mensaje = signal<Message | null>(null);
  showPassword = signal<boolean>(false);
  hasFirstInto = signal<boolean>(false);

  // Formulario reactivo
  loginForm = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.minLength(4), noSpacesValidator],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(4), noSpacesValidator],
    ],
    rememberMe: [false],
  });

  constructor() {
    effect(() => {
      const isLoading = this.authService.isLoading();
      const error = this.authService.errorMessage();
      const hasFirstInto = this.hasFirstInto();
      if (!isLoading && !error && hasFirstInto) {
        this.mensaje.set({
          type: 'success',
          text: 'Iniciando sesión...',
        });
        this.SessionService.ventanaMarcada()
        this.router.navigate(['/']);
      }
      console.log(this.authService.currentUserAuth$());
    });
  }
  get password() {
    return this.loginForm.get('password');
  }
  get username() {
    return this.loginForm.get('username');
  }

  // Mensajes de Validaciones
  get usernameError(): string | boolean {
    const control = this.username;
    if (control?.invalid && (control.dirty || control.touched)) {
      if (control.hasError('required')) return 'Username es requerido';
      if (control.hasError('minlength'))
        return 'Debe tener mínimo 4 caracteres';
      if (control.hasError('noSpaces'))
        return 'No debe contener espacios vacios';
    }
    return false;
  }

  get passwordError(): string | boolean {
    const control = this.password;
    if (control?.invalid && (control.dirty || control.touched)) {
      if (control.hasError('required')) return 'Contraseña es requerida';
      if (control.hasError('noSpaces'))
        return 'No debe contener espacios vacios';
    }
    return false;
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.mensaje.set({
        type: 'error',
        text: 'Por favor, completa todos los campos correctamente.',
      });
      return;
    }
    if (this.username?.valid && this.password?.valid) {
      const username = this.username.value!;
      const password = this.password.value! ;
      this.authService.login(password, username);
      this.hasFirstInto.set(true);
    }
  }
}
