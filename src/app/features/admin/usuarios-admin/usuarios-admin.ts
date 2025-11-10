import {
  Component,
  computed,
  inject,
  linkedSignal,
  OnInit,
  signal,
} from '@angular/core';
import { UserService } from '@shared/services/user-service';
import { Usuario } from 'app/core/model/Usuario';
import { SpinerCargando } from '@shared/components/spiner-cargando/spiner-cargando';
import { AuthService } from '@shared/services/auth-service';
import { SubtituloDashboard } from '@shared/components/subtitulo-dashboard/subtitulo-dashboard';
import { BusquedaInput } from '@shared/components/busqueda-input/busqueda-input';
import { FormsModule } from '@angular/forms';
import { ModalService } from '@shared/services/modal-service';
import { Router } from '@angular/router';
import { FormularioGenerico } from '@shared/components/formulario-generico/formulario-generico';
import { ConfirmacionService } from '@shared/services/confirmacion-service';
import { ModalContainerComponent } from '@shared/components/modal-container-component/modal-container-component';
import { AlertConfirmacion } from "@shared/components/alert-confirmacion/alert-confirmacion";

interface FormField {
  name: string;
  label: string;
  icon?: string;
  type:
    | 'text'
    | 'password'
    | 'email'
    | 'tel'
    | 'hidden'
    | 'checkbox'
    | 'select';
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: any }[]; // para checkbox o select
}
@Component({
  selector: 'app-usuarios-admin',
  imports: [
    SpinerCargando,
    SubtituloDashboard,
    BusquedaInput,
    FormsModule,
    ModalContainerComponent,
    AlertConfirmacion
],
  templateUrl: './usuarios-admin.html',
  styleUrl: './usuarios-admin.css',
})
export class UsuariosAdmin implements OnInit {
  userService = inject(UserService);
  authService = inject(AuthService);
  currentUsers = computed(() =>
    this.userService
      .usuarios()
      .filter(
        (u) => u.username !== this.authService.currentUserAuth$()?.username
      )
  );
  //filtro por rol
  activeFiltroRol = signal<boolean>(false);
  checkedRol = signal(false);
  //filtro por email
  activeFiltroEmail = false;
  searchEmail = signal('');

  //filtro por username
  searchUsername = signal('');

  searchName = signal('');

  constructor() {}

  ngOnInit(): void {
    // 👈 LLAMA AQUÍ
  }

  editarMensaje(usuario: Usuario) {}

  eliminarMensaje(id: number) {}

  cambiarFiltroRol() {
    this.checkedRol.update((c) => !c);
  }

  activarFiltroEmail() {
    this.activeFiltroEmail = !this.activeFiltroEmail;
  }

  resetFiltros() {
    this.searchUsername.set('');
    this.searchEmail.set('');
    this.activeFiltroEmail = false;
    this.activeFiltroRol.set(false);
    this.checkedRol.set(false);
  }

  recibirNombre(nombre: string) {
    this.searchName.set(nombre);
  }

  listaFiltrada = linkedSignal(() => {
    const email = this.searchEmail().toLowerCase();
    const username = this.searchUsername();
    const rol = this.checkedRol();
    const name = this.searchName().toLowerCase();
    let lista = this.currentUsers();

    if (email.length > 0) {
      lista = lista.filter((u) => u.email.toLowerCase().includes(email));
    }

    if (username.length > 0) {
      lista = lista.filter((u) => u.username.includes(username));
    }

    if (this.activeFiltroRol()) {
      const rolUsuario = rol ? 'USUARIO' : 'ADMIN';
      lista = lista.filter((u) => u.rol?.includes(rolUsuario));
    }

    if (name && name.length > 0) {
      lista = lista.filter((u) =>
        u.nombreCompleto.toLowerCase().includes(name)
      );
    }

    return lista;
  });

  //**** Apartado para crear nuevo usuario: ****//
  private router = inject(Router);
  modalRef: any;
  private modalService = inject(ModalService);
  private confirmacionService = inject(ConfirmacionService);

  // MÉTODO PARA ABRIR MODAL ANIDADO
  crearUsuario() {
    this.modalService.openModal({
      component: FormularioGenerico, // Componente a renderizar
      data: {
        // Datos a pasar
        title: 'Crear Nuevo Usuario',
        submitButtonText:"Registrar",
        //como envio un output atravez de este metodo:
        //ejmplo <app (output)="funcion($event)" esto como  lo envio por la data al crear el modelo para recibirlo
        fields: [
          {
            name: 'username',
            label: 'Usuario',
            type: 'text',
            required: true,
            icon: 'bi bi-person-circle',
          },
          {
            name: 'email',
            label: 'Email',
            type: 'email',
            required: true,
            icon: 'bi bi-envelope-at',
          },
          {
            name: 'password',
            label: 'Password',
            type: 'password',
            required: true,
            icon: 'bi bi-shield-lock',
            placeholder:"Ingrese Contraseña"
          },
          {
            name: 'rol',
            label: 'Rol',
            type: 'select',
            required: true,
            icon: 'bi bi-person-vcard-fill',
            options: [
              { label: 'ADMIN', value: 'ADMIN' },
              { label: 'USUARIO', value: 'USUARIO' },
            ],
          },
          {
            name: 'nombreCompleto',
            label: 'Nombre Completo',
            type: 'text',
            required: true,
            icon: 'bi bi-person-fill',
          },
          {
            name: 'celular',
            label: 'Celular',
            type: 'tel',
            required: true,
            icon: 'bi bi-phone',
          },
          {
            name: 'direccion',
            label: 'Dirección',
            type: 'text',
            required: true,
            icon: 'bi bi-geo-alt',
          },
        ],
      },
       outputs: { 'formSubmit':($event) =>{ this.onFormSubmit($event) }},
      width: '600px', // Ancho personalizado
    });
  }

  async onFormSubmit(data: any) {
    console.log(data);
    return;
    const respuesta = await this.confirmacionService.confirm(
      'No hiciste ningun cambio!!! Deseas ir tu Perfil?'
    );
    if (respuesta) this.router.navigate(['/admin/usuarios']);
  }

  //comprobar si hubo cambio en formulario original
  verificarCambios(current: any, original: any): boolean {
    return JSON.stringify(current) === JSON.stringify(original);
  }
}
