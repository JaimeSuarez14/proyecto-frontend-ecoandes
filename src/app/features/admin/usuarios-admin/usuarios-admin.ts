import {Component,computed,inject,linkedSignal,signal} from '@angular/core';
import { UserService } from '@shared/services/user-service';
import { Usuario } from 'app/core/model/Usuario';
import { SpinerCargando } from '@shared/components/spiner-cargando/spiner-cargando';
import { AuthService } from '@shared/services/auth-service';
import { SubtituloDashboard } from '@shared/components/subtitulo-dashboard/subtitulo-dashboard';
import { BusquedaInput } from '@shared/components/busqueda-input/busqueda-input';
import { FormsModule } from '@angular/forms';
import { ModalService } from '@shared/services/utils/modal-service';
import { Router } from '@angular/router';
import { FormularioGenerico } from '@shared/components/formulario-generico/formulario-generico';
import { ConfirmacionService } from '@shared/services/utils/confirmacion-service';
import { ModalContainerComponent } from '@shared/components/modal-container-component/modal-container-component';
import { AlertConfirmacion } from "@shared/components/alert-confirmacion/alert-confirmacion";
import { PaginacionLinkedsignal } from "@shared/components/paginacion-linkedsignal/paginacion-linkedsignal";
import { FiltrosTablas } from "@shared/components/filtros-tablas/filtros-tablas";

@Component({
  selector: 'app-usuarios-admin',
  imports: [
    SpinerCargando,
    SubtituloDashboard,
    BusquedaInput,
    FormsModule,
    ModalContainerComponent,
    AlertConfirmacion,
    PaginacionLinkedsignal,
    FiltrosTablas
],
  templateUrl: './usuarios-admin.html',
  styleUrl: './usuarios-admin.css',
})
export class UsuariosAdmin{
  userService = inject(UserService);
  authService = inject(AuthService);
  currentUsers = computed(() =>
    this.userService.usuarios().filter(u => u.username !== this.authService.currentUserAuth$()?.username)
  );

  listaUsernames = computed(()=> this.currentUsers().map(u => u.username))
  searchUsername = signal("")
  searchEmail=signal("")
  checkedRol = signal(false);
  activeFiltroRol = signal(false);


  editarMensaje(usuario: Usuario) {}

  eliminarMensaje(id: number) {}

  ///apartado para la busqueda por el input nombres
  listaNames = computed(()=> this.currentUsers().map(u => u.nombreCompleto))
  searchName = signal('');
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
  openModalCrearUsuario() {
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
      outputs: { 'formSubmit':($event) =>{ this.onCreateUsuario($event) }},
      width: '600px', // Ancho personalizado
    });
  }

  async onCreateUsuario(data: any) {
    console.log(data);
    this.authService.crearUsuario(data as Usuario)
    const estado = this.authService.errorMessage();
    if(estado){
      const respuesta = await this.confirmacionService.confirm(
      'Hubo un error, deseas intentarlo de nuevo?', "error"
      );
      if (!respuesta){
        this.router.navigate(['/admin/usuarios']);
        this.modalService.closeAllModals();
        return;
      }
      return;
    }
    const respuesta = await this.confirmacionService.confirm(
      'Creacion Exitosa!!!', 'confirmation'
    );
    this.modalService.closeAllModals();
    this.userService.cargarUsuarios()
  }

  //comprobar si hubo cambio en formulario original
  verificarCambios(current: any, original: any): boolean {
    return JSON.stringify(current) === JSON.stringify(original);
  }

  //paginacion
  userColumns: { key: keyof Usuario; label: string }[] = [
    { key: 'nombreCompleto', label: 'NOMBRE' },
    { key: 'username', label: 'USERNAME' },
    { key: 'email', label: 'EMAIL' },
    { key: 'celular', label: 'CELULAR' },
    { key: 'rol', label: 'ROL' },
  ];

  updateUser = signal<Usuario | null >(null)
  openModalUpdateUsuario(data: any){
    const user =  data as Usuario;
    this.updateUser.set(user)
    this.modalService.openModal({
      component: FormularioGenerico,
      data:{
        title: 'Actualizar Usuario',
        submitButtonText:"Actualizar",
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
                machValue:user,

      },

      outputs: { 'formSubmit':($event) => this.onUpdateUsuario($event) },
      width: '600px', // Ancho personalizado
    })
  }

  async onUpdateUsuario(data: any){
    const user =  data as Usuario;
    const currentUser:Usuario = { ...this.updateUser()!, ...user}
    console.log(currentUser);

    if(!this.verificarCambios(currentUser , this.updateUser()!)) {
      this.userService.actualizarUsuario(currentUser);
      await this.confirmacionService.confirm("Se actualizo correctamente!! "+ user.nombreCompleto,"success")
      this.modalService.closeAllModals();
      return;
    }

    const respuesta = await this.confirmacionService.confirm("No hiciste ningun cambio!!! Desear volver intentarlo?", "warning");
    if(!respuesta){
        this.modalService.closeAllModals();
    }

  }

  onDeleteUsuario(data:any){
    const user =  data as Usuario;
    this.confirmacionService.confirm(`Esta seguro de eliminar a ${user.username}??`,"warning")
  }

}
