import { Component } from "@angular/core";

@Component({
  selector: 'app-nested-modal',
  imports: [],
  template: `
    <div style="padding: 20px;">
      <h3>Modal Anidado</h3>
      <!-- Muestra el mensaje recibido desde el modal padre -->
      <p>{{ parentMessage }}</p>
      <p>¡Puedes abrir tantos modales como necesites!</p>

      <!-- Botón para cerrar solo este modal anidado -->
      <button (click)="close()"
              style="padding: 10px 20px; margin-top: 10px; cursor: pointer;">
        Cerrar este modal
      </button>
    </div>
  `
})
export class NestedModalComponent {
  // PROPIEDAD RECIBIDA DEL PADRE:
  // Se establece automáticamente desde config.data
  parentMessage = '';

  // REFERENCIA AL MODAL:
  // Inyectada automáticamente por el contenedor
  modalRef: any;

  // CERRAR EL MODAL ANIDADO
  close() {
    this.modalRef?.close();
    // Al cerrar este modal, el modal padre permanece abierto
    // Cada modal es independiente
  }
}
