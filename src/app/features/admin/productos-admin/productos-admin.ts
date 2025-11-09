import { Component, inject } from '@angular/core';
import { ExampleContentComponent } from '@shared/components/ExampleContentComponent/ExampleContentComponent';
import { ModalService } from '@shared/services/modal-service';
import { ModalContainerComponent } from "@shared/components/modal-container-component/modal-container-component";

@Component({
  selector: 'app-productos-admin',
  imports: [ModalContainerComponent],
  templateUrl: './productos-admin.html',
  styleUrl: './productos-admin.css'
})
export class ProductosAdmin {
    private modalService = inject(ModalService);
    // MÉTODO 1: Abre un modal básico
  openModal() {
    // Llama al servicio para abrir un modal
    this.modalService.openModal({
      component: ExampleContentComponent,  // Componente a renderizar
      data: {
        // DATOS QUE SE PASAN AL COMPONENTE:
        // Estas propiedades sobrescriben los valores por defecto del componente
        title: 'Mi Modal Dinámico',
        message: '¡Este componente se renderiza dinámicamente!'
      },
      // CONFIGURACIÓN DEL MODAL:
      width: '600px',              // Ancho de 600 píxeles
      closeOnBackdrop: true,       // Se cierra al hacer clic fuera
      showCloseButton: true        // Muestra el botón X
    });
  }

  // MÉTODO 2: Abre un modal con configuración diferente
  openCustomModal() {
    this.modalService.openModal({
      component: ExampleContentComponent,  // Mismo componente, diferente configuración
      data: {
        title: 'Modal Personalizado',
        message: 'Con diferentes opciones de configuración'
      },
      width: '800px',              // Más ancho
      height: '400px',             // Alto fijo
      closeOnBackdrop: false,      // NO se cierra al hacer clic fuera
      showCloseButton: true        // Sí muestra el botón X
    });
  }
}
