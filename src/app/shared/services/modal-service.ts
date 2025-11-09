import { ComponentRef, Injectable, signal, Type } from '@angular/core';

// INTERFAZ DE CONFIGURACIÓN DEL MODAL
// Define las opciones que se pueden pasar al abrir un modal
export interface ModalConfig {
  component: Type<any>;        // El componente que se va a renderizar dentro del modal
  data?: any;                  // Datos opcionales que se pasan al componente (props)
  width?: string;              // Ancho del modal (ejemplo: '500px', '50%')
  height?: string;             // Alto del modal (ejemplo: '300px', 'auto')
  closeOnBackdrop?: boolean;   // Si true, el modal se cierra al hacer clic en el fondo oscuro
  showCloseButton?: boolean;   // Si true, muestra el botón X para cerrar el modal
}

// INTERFAZ DE REFERENCIA AL MODAL
// Representa un modal abierto y proporciona métodos para controlarlo
export interface ModalRef {
  id: string;                           // Identificador único del modal (ejemplo: 'modal-1', 'modal-2')
  componentRef: ComponentRef<any>;      // Referencia al componente Angular renderizado dentro del modal
  close: (result?: any) => void;        // Función para cerrar el modal, opcionalmente devolviendo un resultado
  updateData: (data: any) => void;      // Función para actualizar los datos del componente dinámicamente
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  // SIGNAL PRIVADO: Almacena el array de modales activos
  // Signal es reactivo: cuando cambia, Angular actualiza automáticamente la UI
  private modals = signal<ModalRef[]>([]);

  // CONTADOR: Genera IDs únicos para cada modal
  // Se incrementa cada vez que se abre un nuevo modal
  private modalCounter = 0;

  // SIGNAL PÚBLICO DE SOLO LECTURA: Expone los modales activos sin permitir modificación externa
  // Los componentes pueden leerlo pero no modificarlo directamente
  public activeModals = this.modals.asReadonly();

  // MÉTODO PRINCIPAL: Abre un nuevo modal
  openModal(config: ModalConfig): ModalRef {
    // 1. GENERAR ID ÚNICO
    // Incrementa el contador y crea un ID único para este modal
    const id = `modal-${++this.modalCounter}`;

    // 2. CREAR OBJETO MODALREF
    // Este objeto será la interfaz pública para controlar el modal
    const modalRef: ModalRef = {
      id,  // ID único generado
      componentRef: null as any,  // Se asignará después cuando se renderice el componente
      close: (result?: any) => this.closeModal(id, result),  // Función para cerrar este modal específico
      updateData: (data: any) => this.updateModalData(id, data)  // Función para actualizar datos del componente
    };

    // 3. AGREGAR MODAL AL ESTADO
    // Usa update() de signal para agregar el nuevo modal al array de forma reactiva
    // El spread operator [...modals] crea un nuevo array para que Angular detecte el cambio
    // Guardamos también la config para usarla después al renderizar
    this.modals.update(modals => [...modals, { ...modalRef, config } as any]);

    // 4. RETORNAR REFERENCIA
    // Devuelve el modalRef para que el código que abrió el modal pueda controlarlo
    return modalRef;
  }

  // CERRAR UN MODAL ESPECÍFICO
  closeModal(id: string, result?: any) {
    // Actualiza el signal de modales de forma reactiva
    this.modals.update(modals => {
      // 1. BUSCAR EL MODAL: Encuentra el modal por su ID
      const modal = modals.find(m => m.id === id);

      // 2. DESTRUIR COMPONENTE: Si el modal tiene un componente renderizado, lo destruye
      // Esto libera memoria y elimina el componente del DOM
      if (modal?.componentRef) {
        modal.componentRef.destroy();
      }

      // 3. FILTRAR ARRAY: Retorna un nuevo array sin el modal cerrado
      // El filter crea un nuevo array, lo que permite a Angular detectar el cambio
      return modals.filter(m => m.id !== id);
    });
  }

  // CERRAR TODOS LOS MODALES
  closeAllModals() {
    // 1. DESTRUIR CADA COMPONENTE: Itera sobre todos los modales y destruye sus componentes
    this.modals().forEach(modal => {
      if (modal.componentRef) {
        modal.componentRef.destroy();
      }
    });

    // 2. LIMPIAR ARRAY: Resetea el signal a un array vacío
    this.modals.set([]);
  }

  // ACTUALIZAR DATOS DE UN MODAL
  // Permite cambiar las propiedades del componente sin recrearlo
  private updateModalData(id: string, data: any) {
    // 1. BUSCAR MODAL: Encuentra el modal por ID
    const modal = this.modals().find(m => m.id === id);

    // 2. ACTUALIZAR PROPIEDADES: Si existe, usa Object.assign para copiar las nuevas propiedades
    // al componente renderizado
    if (modal?.componentRef) {
      Object.assign(modal.componentRef.instance, data);
    }
  }

  // OBTENER CONFIGURACIÓN DE UN MODAL
  // Útil para que el componente contenedor sepa cómo renderizar el modal
  getModalConfig(id: string): ModalConfig | undefined {
    return (this.modals().find(m => m.id === id) as any)?.config;
  }

  // ASIGNAR REFERENCIA DEL COMPONENTE
  // Se llama después de que el componente es creado y renderizado
  setComponentRef(id: string, componentRef: ComponentRef<any>) {
    // Actualiza el modal con la referencia al componente creado
    this.modals.update(modals =>
      modals.map(m => m.id === id ? { ...m, componentRef } : m)
    );
  }
}
