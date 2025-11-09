import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth-service';
import { Usuario } from '../../core/model/Usuario';

interface Message {
  type: 'success' | 'error';
  text: string;
}

@Component({
  selector: 'app-register-page',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  authService = inject(AuthService);

  usuarioSignal = {
    username: '',
    password: '',
    nombreCompleto: '',
    email: '',
    celular: '',
    direccion: '',
  };


  // Signals para la visualización y mensajes
  passwordVisible = signal(false);
  message = signal<Message | null>(null);

  // Computed signal para la validación del formulario
  isFormValid(){
    return (
      this.usuarioSignal.username.trim().length > 0 &&
      this.usuarioSignal.password.trim().length >= 6  &&
      this.usuarioSignal.nombreCompleto.trim().length > 0 &&
      this.usuarioSignal.email.trim().includes('@') &&
      this.usuarioSignal.celular.trim().length > 0 &&
      this.usuarioSignal.direccion.trim().length > 10
    );
  }



  // Computed para mostrar mensaje según estado del servicio
  isLoading = computed(() => this.authService.isLoading());
  errorMessage = computed(() => this.authService.errorMessage());
  hasFirstInto =  signal(false);

  constructor() {
    // Reacción automática al error
    effect(() => {
      const error = this.errorMessage();
      if (error) {
        this.message.set({ type: 'error', text: error });
      }
    });

    // Reacción automática al éxito
    effect(() => {
      const isLoading = this.isLoading();
      const error = this.errorMessage();
      const hasFirstInto = this.hasFirstInto();
      if (!isLoading && !error && hasFirstInto) {
        this.message.set({
          type: 'success',
          text: 'Usuario registrado con éxito.',
        });
      }
    });
  }

  onSubmit(): void {
    this.hasFirstInto.set(true);
    if (!this.isFormValid()) {
      this.message.set({
        type: 'error',
        text: 'Por favor, completa todos los campos requeridos correctamente.',
      });
      return;
    }
    const userData: Usuario = { ...this.usuarioSignal };
    this.authService.crearUsuario(userData);

  }

  togglePasswordVisibility(): void {
    this.passwordVisible.set(!this.passwordVisible());
  }

  closeMessage(): void {
    this.message.set(null);
  }
}
