import { UserService } from '@shared/services/user-service';
import { TitleCasePipe } from '@angular/common';
import { Component, signal, input, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalService } from '@shared/services/utils/modal-service';
import { noSpacesValidator } from '@shared/validators/noSpacesValidator';
import { AlertConfirmacion } from '../alert-confirmacion/alert-confirmacion';
import { ConfirmacionService } from '@shared/services/utils/confirmacion-service';

@Component({
  selector: 'app-modificar-perfil',
  imports: [FormsModule, TitleCasePipe, AlertConfirmacion],
  templateUrl: './modificar-perfil.html',
  styleUrl: './modificar-perfil.css',
})
export class ModificarPerfil {
  titulo = '';
  primerMensaje = '';
  valueInput = signal<string>('');
  name = '';
  verificarName = '';
  secondvalueInput = signal<string>('');
  UserService = inject(UserService);
  private confirmacionService = inject(ConfirmacionService);
  //true si ambos son iguales
  matchInputs = computed(
    () =>
      this.valueInput().trim() !== '' &&
      this.valueInput() === this.secondvalueInput()
  );

  //volvemos abrir el modal pero con un input mas para registrar la nueva clave
  modalRef: any;
  private modalService = inject(ModalService);
  // MÉTODO PARA ABRIR MODAL ANIDADO
  openSecondModal() {
    // Abre un nuevo modal usando el servicio
    // Este modal se renderizará encima del modal actual
    this.modalService.openModal({
      component: ModificarPerfil, // Componente a renderizar
      data:
        this.name === 'celular'
          ? {
              // Datos a pasar
              titulo: 'Actualizar Número de Celular',
              primerMensaje:
                'Información: Para mayor seguridad ingrese dos veces su nuevo numero de celular.',
              name: 'celular',
              verificarName: 'verificarCelular',
            }
          : {
              // Datos a pasar
              titulo: 'Actualizar Contraseña',
              primerMensaje:
                'Información: Para mayor seguridad ingrese dos veces la contraseña nueva.',
              name: 'password',
              verificarName: 'verificarPassword',
            },
      width: '500px', // Ancho personalizado
    });
  }

  async checkInput() {
    if (
      this.verificarName.length <= 0 &&
      this.secondvalueInput().length <= 0 &&
      !this.matchInputs()
    ) {
      const estado = await this.UserService.verificarConstraseña(
        this.valueInput()
      );

      if (estado) {
        const respuesta = await this.confirmacionService.confirm(
          'Contraseña Correcta!!',
          'success'
        );
        if (respuesta) {
          this.openSecondModal();
          return;
        }
        return;
      }
      const answer = await this.confirmacionService.confirm(
        'Contraseña Incorrecta!!',
        'error'
      );
      if (!answer) {
        this.modalService.closeAllModals();
        return;
      }
      return;
    }

    //logica para enviar el dato al backend
    const estado = await this.UserService.actualizarContraseña(
      this.valueInput()
    );
    if (estado.status === 'mensaje') {
      await this.confirmacionService.confirm(estado.message, 'success');
      this.verificarName = '';
      this.modalService.closeAllModals();
      return;
    }
    alert(this.name + ' no se puedo actualizar!!');
  }

  // MÉTODO PARA CERRAR EL MODAL ACTUAL
  close() {
    // Usa el operador opcional ?. por si modalRef aún no está asignado
    this.modalRef?.close();
  }
}
