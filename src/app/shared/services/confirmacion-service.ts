import { Injectable, signal } from '@angular/core';
import { NotificacionTipo} from '@models/alert.type'

@Injectable({
  providedIn: 'root'
})
export class ConfirmacionService {
  tipoId = signal<NotificacionTipo>("confirmation");
  visible = signal(false);
  mensaje = signal('');
  private resolver: ((value: boolean) => void) | null = null;

  confirm(mensaje: string, tipo: NotificacionTipo): Promise<boolean> {
    this.tipoId.set(tipo)
    this.mensaje.set(mensaje);
    this.visible.set(true);
    return new Promise<boolean>((resolve) => {
      this.resolver = resolve;
    });
  }

  aceptar() {
    this.tipoId.set('confirmation')
    this.visible.set(false);
    this.mensaje.set('');
    this.resolver?.(true);
    this.resolver = null;
  }

  cancelar() {
    this.tipoId.set('confirmation')
    this.visible.set(false);
    this.mensaje.set('');
    this.resolver?.(false);
    this.resolver = null;
  }

}
