import { Component, inject } from "@angular/core";
import { ModalService } from "@shared/services/modal-service";
import { NestedModalComponent } from "../NestedModalComponent/NestedModalComponent";

@Component({
  selector: 'app-example-content',  // Selector (no se usa porque se carga dinámicamente)
  imports: [],
  template: `
    <!-- TEMPLATE DEL COMPONENTE QUE SE RENDERIZA DENTRO DEL MODAL -->
    <div class="border border-amber-100 p-2">
      <!-- INTERPOLACIÓN: Muestra las propiedades del componente -->
      <h2 class="text-2xl py-2 font-bold text-center" > {{ title }}</h2>
      <p class="my-4 py-2">{{ message }}</p>

      <div class="flex justify-around items-center gap-5">
        <!-- BOTÓN PARA ABRIR MODAL ANIDADO -->
        <!-- Demuestra que un modal puede abrir otro modal -->
        <button (click)="openNestedModal()"
                class="mx-2 py-1 flex-1 border border-blue-700 text-blue-200 bg-blue-500 cursor-pointer hover:bg-blue-600 rounded-lg hover:border-blue-800 hover:text-white"
                >
          Abrir Modal Anidado
        </button>

        <!-- BOTÓN PARA CERRAR ESTE MODAL -->
        <!-- Usa la referencia modalRef inyectada por el contenedor -->
        <button (click)="close()"
                class="mx-2 py-1 flex-1 border border-red-700 text-red-200 bg-red-500 cursor-pointer hover:bg-red-600 rounded-lg hover:border-red-800 hover:text-white">
          Cerrar
        </button>
      </div>
    </div>
  `
})
export class ExampleContentComponent {
  // PROPIEDADES DEL COMPONENTE:
  // Estas se establecen automáticamente cuando se pasa 'data' al abrir el modal
  title = '';           // Título por defecto (se puede sobrescribir)
  message = '';  // Mensaje por defecto

  // REFERENCIA AL MODAL:
  // Esta propiedad se inyecta automáticamente por el ModalContainerComponent
  // Permite al componente cerrar su propio modal
  modalRef: any;

  // INYECCIÓN DEL SERVICIO:
  // Necesario para abrir modales anidados
  private modalService = inject(ModalService);

  // MÉTODO PARA ABRIR MODAL ANIDADO
  openNestedModal() {
    // Abre un nuevo modal usando el servicio
    // Este modal se renderizará encima del modal actual
    this.modalService.openModal({
      component: NestedModalComponent,  // Componente a renderizar
      data: { parentMessage: 'Soy un modal anidado!' },  // Datos a pasar
      width: '400px'  // Ancho personalizado
    });
  }

  // MÉTODO PARA CERRAR EL MODAL ACTUAL
  close() {
    // Usa el operador opcional ?. por si modalRef aún no está asignado
    this.modalRef?.close();
  }
}
