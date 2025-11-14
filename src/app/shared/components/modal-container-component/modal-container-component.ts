import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ComponentRef, createComponent, effect, EnvironmentInjector, inject, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { ModalService } from '@shared/services/utils/modal-service';

@Component({
  selector: 'app-modal-container-component',
  imports: [CommonModule],
  templateUrl: './modal-container-component.html',
  styleUrl: './modal-container-component.css'
})
export class ModalContainerComponent implements AfterViewInit  {
  // @ViewChild: Obtiene referencia al elemento #modalBody del template
  // ViewContainerRef: Tipo especial que permite insertar componentes dinámicamente
  // Este es el contenedor donde se renderizarán los componentes de cada modal
  @ViewChildren('modalBody', { read: ViewContainerRef })
  modalBodies!: QueryList<ViewContainerRef>;

  // INYECCIÓN DE DEPENDENCIAS:
  modalService = inject(ModalService);           // Servicio para acceder al estado de modales
  private injector = inject(EnvironmentInjector); // Inyector necesario para crear componentes

  // MAP DE COMPONENTES RENDERIZADOS:
  // Almacena las referencias de los componentes ya creados para evitar duplicados
  // Key: ID del modal, Value: ComponentRef del componente renderizado
  private renderedModals = new Map<string, ComponentRef<any>>();

  constructor() {
    // EFFECT #1: LIMPIEZA DE MODALES CERRADOS
    // Este effect se ejecuta automáticamente cuando activeModals() cambia
    // IMPORTANTE: effect() DEBE estar en el constructor o en inicializadores de campo
    effect(() => {
      const activeModals = this.modalService.activeModals();

      // Recorre los modales renderizados y elimina los que ya no están activos
      this.renderedModals.forEach((componentRef, id) => {
        if (!activeModals.find(m => m.id === id)) {
          // Si el modal no está en la lista de activos, lo elimina del Map
          this.renderedModals.delete(id);
        }
      });
    });

    // EFFECT #2: RENDERIZAR NUEVOS MODALES
    // PROBLEMA RESUELTO: Ahora verificamos que modalBodies exista Y tenga elementos
    effect(() => {
      const activeModals = this.modalService.activeModals();

      // Recorre cada modal activo
      activeModals.forEach((modal, index) => {
        // Solo renderiza si:
        // 1. No está ya renderizado
        // 2. modalBodies existe y tiene elementos
        // 3. Existe un ViewContainerRef para este índice
        if (!this.renderedModals.has(modal.id) &&
            this.modalBodies &&
            this.modalBodies.length > index) {
          // Obtiene el ViewContainerRef correcto por índice
          const container = this.modalBodies.toArray()[index];
          this.renderModal(modal, container);
        }
      });
    });
  }

  ngAfterViewInit() {
    // HOOK DEL CICLO DE VIDA: Se ejecuta después de que la vista está inicializada
    // IMPORTANTE: Suscribirse a los cambios de modalBodies
    // QueryList emite un evento cada vez que el DOM cambia (se agregan/eliminan elementos)
    this.modalBodies.changes.subscribe(() => {
      // Cuando cambia la lista de contenedores, intentar renderizar modales pendientes
      const activeModals = this.modalService.activeModals();

      activeModals.forEach((modal, index) => {
        if (!this.renderedModals.has(modal.id) &&
            this.modalBodies.length > index) {
          const container = this.modalBodies.toArray()[index];
          this.renderModal(modal, container);
        }
      });
    });

    // También intentar renderizar inmediatamente después de que la vista se inicializa
    const activeModals = this.modalService.activeModals();
    activeModals.forEach((modal, index) => {
      if (!this.renderedModals.has(modal.id) &&
          this.modalBodies.length > index) {
        const container = this.modalBodies.toArray()[index];
        this.renderModal(modal, container);
      }
    });
  }

  // MÉTODO PARA RENDERIZAR UN MODAL
  // AHORA RECIBE EL CONTENEDOR ESPECÍFICO COMO PARÁMETRO
  private renderModal(modal: any, container: ViewContainerRef) {
    // 1. OBTENER CONFIGURACIÓN
    // Busca la configuración del modal en el servicio
    const config = this.modalService.getModalConfig(modal.id);
    if (!config) return;  // Si no hay config, salir del método

    // 2. CREAR COMPONENTE DINÁMICAMENTE
    // createComponent: API de Angular para crear componentes programáticamente
    // Parámetros:
    // - config.component: La clase del componente a crear
    // - environmentInjector: Proporciona el contexto de inyección de dependencias
    // - elementInjector: Otro nivel de inyección (en este caso, el mismo)
    const componentRef = createComponent(config.component, {
      environmentInjector: this.injector,
      elementInjector: this.injector
    });

    // 3. INYECTAR DATOS AL COMPONENTE
    // Si config.data existe, copia todas sus propiedades al componente creado
    // Esto es como hacer: component.titulo = 'Hola', component.valor = 123
    if (config.data) {
      Object.assign(componentRef.instance, config.data);
    }

    // 4. INYECTAR REFERENCIA DEL MODAL
    // Agrega la referencia modalRef al componente para que pueda cerrarse a sí mismo
    // El componente hijo puede hacer: this.modalRef.close()
    if (componentRef.instance) {
      (componentRef.instance as any).modalRef = modal;
    }

    // NUEVO: Conecta los outputs del componente con los manejadores proporcionados
    if (config.outputs && componentRef.instance) {
      // Recorre cada output definido en la configuración
      Object.keys(config.outputs).forEach(outputName => {
        const handler = config.outputs![outputName];
        const output = componentRef.instance[outputName];

        // VERIFICAR SI ES UN EVENTEMITTER (OUTPUT DE ANGULAR)
        // Los @Output() son instancias de EventEmitter que tienen el método subscribe()
        if (output && typeof output.subscribe === 'function') {
          // SUSCRIBIRSE AL EVENTO
          // Cuando el componente emita el evento, se ejecutará el handler
          output.subscribe((event: any) => {
            handler(event);
          });
        }
      });
    }

    // 5. INSERTAR EN EL DOM
    // CAMBIO IMPORTANTE: Ahora usa el contenedor específico pasado como parámetro
    // en lugar de this.modalBody (que era único y causaba el problema)
    container.insert(componentRef.hostView);

    // 6. GUARDAR REFERENCIA
    // Almacena el componentRef en el Map para evitar renderizar duplicados
    this.renderedModals.set(modal.id, componentRef);

    // 7. ACTUALIZAR SERVICIO
    // Notifica al servicio que el componente fue creado exitosamente
    this.modalService.setComponentRef(modal.id, componentRef);
  }

  // MANEJADOR DE CLIC EN EL BACKDROP
  onBackdropClick(modalId: string, event: MouseEvent) {
    // 1. OBTENER CONFIGURACIÓN
    const config = this.modalService.getModalConfig(modalId);

    // 2. VERIFICAR SI DEBE CERRARSE
    // Solo cierra si closeOnBackdrop no es false
    // (undefined o true también cierran el modal)
    if (config?.closeOnBackdrop !== false) {
      // 3. BUSCAR Y CERRAR MODAL
      const modal = this.modalService.activeModals().find(m => m.id === modalId);
      modal?.close();
    }
  }

  // OBTENER CONFIGURACIÓN
  // Método auxiliar para acceder fácilmente a la config desde el template
  getConfig(modalId: string) {
    return this.modalService.getModalConfig(modalId);
  }
}
