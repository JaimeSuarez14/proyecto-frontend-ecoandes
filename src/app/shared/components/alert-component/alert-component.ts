import { Component, effect, input, model } from '@angular/core';
import { AlertaTipo } from '@models/alert.type';


@Component({
  selector: 'app-alert-component',
  imports: [],
  templateUrl: './alert-component.html',
  styleUrl: './alert-component.css',
})
export class AlertComponent {
  tipo = input< AlertaTipo>('info');
  mensaje = input<string>();
  isVisible = model<boolean>(false);
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => {
      this.activarTemporizador();
    });
  }

  close() {
    this.isVisible.update((v) => !v);
  }

  activarTemporizador() {
    const tipoA = this.tipo();
    const mensaje = this.mensaje();
    const visible = this.isVisible();
    console.log("mensaje");
    if (visible) {
      // Limpia cualquier temporizador previo
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      // Inicia nuevo temporizador
      this.timeoutId = setTimeout(() => {
        this.isVisible.set(false);
        this.timeoutId = null;
      }, 4000);
    } else {
      // Si se cierra manualmente, limpia el temporizador
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    }
  }
}
