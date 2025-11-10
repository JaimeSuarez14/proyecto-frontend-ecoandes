import { AuthService } from '@shared/services/auth-service';
import { Component, computed, inject } from '@angular/core';
import { FormularioGenerico } from "@shared/components/formulario-generico/formulario-generico";
import { SubtituloDashboard } from "@shared/components/subtitulo-dashboard/subtitulo-dashboard";
import { UserService } from '@shared/services/user-service';
import { Usuario } from 'app/core/model/Usuario';
import { AlertConfirmacion } from "@shared/components/alert-confirmacion/alert-confirmacion";
import { ConfirmacionService } from '@shared/services/confirmacion-service';
import { Router } from '@angular/router';

export interface FormField {
  name: string;
  label: string;
  icon?: string;
  type: 'text' | 'password' | 'email' | 'tel' | 'hidden' | 'checkbox' | "select";
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: any }[]; // para checkbox o select
}

@Component({
  selector: 'app-actualizar-perfil',
  imports: [FormularioGenerico, SubtituloDashboard, AlertConfirmacion],
  templateUrl: './actualizar-perfil.html',
  styleUrl: './actualizar-perfil.css'
})
export default class ActualizarPerfil {
  private confirmacionService = inject(ConfirmacionService)
  authService = inject(AuthService);
  userService = inject(UserService);
  private router = inject(Router);

  fields: FormField[] = [
    { name: 'username', label: 'Usuario', type: 'text', required: true, icon: 'bi bi-person-circle' },
    { name: 'email', label: 'Email', type: 'email', required: true, icon: 'bi bi-envelope-at' },
    { name: 'rol', label: 'Rol', type: 'select', required: true, icon: 'bi bi-person-vcard-fill',
      options:[{label:"ADMIN", value:"ADMIN"}, {label:"USUARIO", value:"USUARIO"}],
    },
    { name: 'nombreCompleto', label: 'Nombre Completo', type: 'text', required: true, icon: 'bi bi-person-fill' },
    { name: 'direccion', label: 'Dirección', type: 'text', required: true, icon: 'bi bi-geo-alt' },
  ]

  async onFormSubmit(data: any) {
    const  usuarioUpdate: Usuario = { ...this.authService.currentUserAuth$()!, ...data as AuthService};
    if(!this.verificarCambios(usuarioUpdate , this.authService.currentUserAuth$())) {
      this.userService.actualizarUsuario(usuarioUpdate);
      return;
    }
    const respuesta = await this.confirmacionService.confirm("No hiciste ningun cambio!!! Deseas ir tu Perfil?");
    if(respuesta) this.router.navigate(['/admin/perfil-login']);
  }

  //comprobar si hubo cambio en formulario original
  verificarCambios(current: any, original: any): boolean {
  return JSON.stringify(current) === JSON.stringify(original);
}

}
