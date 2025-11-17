import { Component, inject, OnInit, signal } from '@angular/core';
import { CarouselComponent } from '../../shared/carousel-component/carousel-component';
import { AlertComponent } from '@shared/components/alert-component/alert-component';
import { AlertaTipo } from '@models/alert.type';
import { SessionService } from '@shared/services/utils/session-service';
import { ProductoHome, NoticiasHome } from '@models/data/home.items';
import { SubtituloDashboard } from '@shared/components/subtitulo-dashboard/subtitulo-dashboard';
import { ModalService } from '@shared/services/utils/modal-service';
import { FormularioGenerico } from '@shared/components/formulario-generico/formulario-generico';
import { ModalContainerComponent } from '@shared/components/modal-container-component/modal-container-component';
import { AuthService } from '@shared/services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { ConfirmacionService } from '@shared/services/utils/confirmacion-service';
import { AlertConfirmacion } from "@shared/components/alert-confirmacion/alert-confirmacion";

@Component({
  selector: 'app-home-page',
  imports: [
    CarouselComponent,
    AlertComponent,
    SubtituloDashboard,
    ModalContainerComponent,
    AlertConfirmacion,
    RouterLink
],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  private SessionService = inject(SessionService);

  //para usar la alerta su atributos
  esVisible = signal<boolean>(false);
  tipo = signal<AlertaTipo>('success');
  mensaje = signal('');
  productoHome = [...ProductoHome];
  noticiasHome = [...NoticiasHome];

  ngOnInit(): void {
    //para mostrar el mensaje de actualizacion
    if (this.SessionService.consumoDeAlerta())
      this.abrirAlerta('success', 'Bienvenido Querido Usuario');
  }

  abrirAlerta(tipo: AlertaTipo, mensaje: string) {
    this.esVisible.set(true);
    this.tipo.set(tipo);
    this.mensaje.set(mensaje);
  }

  //abrir modal
  private authService = inject(AuthService);
  private router = inject(Router);
  private confirmacionService = inject(ConfirmacionService);
  modalService = inject(ModalService);

  async openFormularioConsulta(asunto: string) {
    if (this.authService.currentUserAuth$() === null) {
      const res = await this.confirmacionService.confirm('Necesitas Iniciar Sesion, Deseas ir al Login??', 'warning');
      if(res) this.router.navigate(['/login']);
      return;
    }
    this.modalService.openModal({
      component: FormularioGenerico,
      data: {
        title: 'Formulario de Interes',
        submitButtonText: 'Registrar',
        machValue: {
          asunto: asunto,
          estado: 'Pendiente',
          username: this.authService.currentUserAuth$()?.username,
          email: this.authService.currentUserAuth$()?.email,
        },
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
            name: 'asunto',
            label: 'Asunto',
            type: 'text',
            required: true,
            icon: 'bi bi-bookmark-dash-fill',
          },
          {
            name: 'contenido',
            label: 'Mensaje',
            type: 'textarea',
            required: true,
            icon: 'bi bi-list-stars',
          },
          {
            name: 'estado',
            label: 'Estado',
            type: 'select',
            required: true,
            icon: 'bi bi-info-square-fill',
            options: [{ label: 'Pendiente', value: 'Pendiente' }],
          },
        ],
      },
      outputs: { formSubmit: ($event) => this.registrarConsulta($event) },
      width: '600px', // Ancho personalizado
    });
  }

  registrarConsulta(data: any) {
    console.log(data);
  }
}
