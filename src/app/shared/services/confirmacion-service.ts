import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmacionService {
  visible = signal(false);
  mensaje = signal('');
  private resolver: ((value: boolean) => void) | null = null;

  confirm(mensaje: string): Promise<boolean> {
    this.mensaje.set(mensaje);
    this.visible.set(true);
    return new Promise<boolean>((resolve) => {
      this.resolver = resolve;
    });
  }

  aceptar() {
    this.visible.set(false);
    this.mensaje.set('');
    this.resolver?.(true);
    this.resolver = null;
  }

  cancelar() {
    this.visible.set(false);
    this.mensaje.set('');
    this.resolver?.(false);
    this.resolver = null;
  }

}
