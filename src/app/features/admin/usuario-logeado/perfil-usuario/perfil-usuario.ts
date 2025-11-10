import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AlertaTipo } from '@models/alert.type';
import { AuthService } from '@shared/services/auth-service';
import { SessionService } from '@shared/services/session-service';
import { UserService } from '@shared/services/user-service';
import { AlertComponent } from '@shared/components/alert-component/alert-component';
import { CelularOcultoPipe } from '@pipes/celular-oculto-pipe';
import { ModalService } from '@shared/services/modal-service';
import { ModificarPerfil } from '@shared/components/modificar-perfil/modificar-perfil';
import { ModalContainerComponent } from '@shared/components/modal-container-component/modal-container-component';
import { CardPerfilUsuario } from '@shared/components/card-perfil-usuario/card-perfil-usuario';

@Component({
  selector: 'app-perfil-usuario',
  imports: [
    AlertComponent,
    CelularOcultoPipe,
    ModalContainerComponent,
    CardPerfilUsuario,
  ],
  templateUrl: './perfil-usuario.html',
  styleUrl: './perfil-usuario.css',
})
export default class PerfilUsuario implements OnInit {
  authService = inject(AuthService);
  userService = inject(UserService);
  usuario = computed(() => this.authService.currentUserAuth$());

  private SessionService = inject(SessionService);

  //para usar la alerta su atributos
  esVisible = signal<boolean>(false);
  tipo = signal<AlertaTipo>('success');
  mensaje = signal('');

  ngOnInit(): void {
    //para mostrar el mensaje de actualizacion
    if (this.SessionService.consumoDeAlerta())
      this.abrirAlerta('success', 'Perfil actualizado!!!');
  }

  abrirAlerta(tipo: AlertaTipo, mensaje: string) {
    this.esVisible.set(true);
    this.tipo.set(tipo);
    this.mensaje.set(mensaje);
  }

  //apartado para el modal
  modalRef: any;
  private modalService = inject(ModalService);
  // MÉTODO PARA ABRIR MODAL ANIDADO
  openModificarCelular() {
    // Abre un nuevo modal usando el servicio
    // Este modal se renderizará encima del modal actual
    this.modalService.openModal({
      component: ModificarPerfil, // Componente a renderizar
      data: {
        // Datos a pasar
        titulo: 'Actualizar Número de Celular',
        primerMensaje:
          'Información: Para mayor seguridad vuelva a ingresar su numero anterior.',
        name: 'celular',
      },
      width: '600px', // Ancho personalizado
    });
  }

  // MÉTODO PARA CERRAR EL MODAL ACTUAL
  close() {
    // Usa el operador opcional ?. por si modalRef aún no está asignado
    this.modalRef?.close();
  }

  openModificarContrasena() {
    // Abre un nuevo modal usando el servicio
    // Este modal se renderizará encima del modal actual
    this.modalService.openModal({
      component: ModificarPerfil, // Componente a renderizar
      data: {
        // Datos a pasar
        titulo: 'Actualizar Contraseña',
        primerMensaje:
          'Información: Para mayor seguridad vuelva ingresar su contraseña para ser verificada.',
        name: 'password',
      },
      width: '600px', // Ancho personalizado
    });
  }
}
