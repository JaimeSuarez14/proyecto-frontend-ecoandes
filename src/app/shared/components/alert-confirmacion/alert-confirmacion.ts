import { Component, computed, HostListener, inject, input } from '@angular/core';
import { ConfirmacionService } from '../../services/utils/confirmacion-service';
import { NotificacionTipo } from '@models/alert.type';

@Component({
  selector: 'app-alert-confirmacion',
  imports: [],
  templateUrl: './alert-confirmacion.html',
  styleUrl: './alert-confirmacion.css',
})
export class AlertConfirmacion {
  type = 'Advertencia';
  title = 'Acción Requerida';
  icon = 'bi bi-check2-circle';
  colors = {
    gradient: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-500/20',
    icon: 'text-amber-400',
    button: 'bg-amber-600 hover:bg-amber-700',
  };
  modals = [
    {
      id: 'success',
      type: 'Éxito',
      title: 'Operación Exitosa',
      message: 'Tu solicitud ha sido procesada correctamente. Todos los cambios han sido guardados.',
      icon: "bi bi-check2-circle",
      colors: {
        gradient: 'from-emerald-500 to-green-600',
        bg: 'bg-emerald-500/20',
        icon: 'text-emerald-400',
        button: 'bg-emerald-600 hover:bg-emerald-700'
      }
    },
    {
      id: 'error',
      type: 'Error',
      title: 'Error Crítico',
      message: 'No se pudo completar la operación. Por favor, verifica los datos e intenta nuevamente.',
      icon: 'bi bi-x-octagon',
      colors: {
        gradient: 'from-red-500 to-rose-600',
        bg: 'bg-red-500/20',
        icon: 'text-red-400',
        button: 'bg-red-600 hover:bg-red-700'
      }
    },
    {
      id: 'warning',
      type: 'Advertencia',
      title: 'Acción Requerida',
      message: 'Algunos campos necesitan tu atención antes de continuar con el proceso.',
      icon: 'bi bi-exclamation-triangle',
      colors: {
        gradient: 'from-amber-500 to-orange-600',
        bg: 'bg-amber-500/20',
        icon: 'text-amber-400',
        button: 'bg-amber-600 hover:bg-amber-700'
      }
    },
    {
      id: 'info',
      type: 'Información',
      title: 'Actualización Disponible',
      message: 'Hay una nueva versión disponible. Te recomendamos actualizar para obtener las últimas mejoras.',
      icon: 'bi bi-info-circle',
      colors: {
        gradient: 'from-blue-500 to-cyan-600',
        bg: 'bg-blue-500/20',
        icon: 'text-blue-400',
        button: 'bg-blue-600 hover:bg-blue-700'
      }
    },
    {
      id: 'confirmation',
      type: 'Confirmación',
      title: '¿Estás Seguro?',
      message: 'Esta acción no se puede deshacer. Por favor confirma que deseas continuar con esta operación.',
      icon: 'bi bi-question-octagon',
      colors: {
        gradient: 'from-purple-500 to-pink-600',
        bg: 'bg-purple-500/20',
        icon: 'text-purple-400',
        button: 'bg-purple-600 hover:bg-purple-700'
      }
    }
  ];
  model = inject(ConfirmacionService);
  alertaSeleccionado = computed( () => {
    const eleccion: NotificacionTipo = this.model.tipoId();
    return this.modals.find( e => e.id=== eleccion)!
  })

  // Escucha global de la tecla Escape
  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.model.visible()) {
      this.model.cancelar();
    }
  }


}
