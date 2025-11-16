import { ModalConfig } from './../../shared/services/utils/modal-service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CarouselComponent } from '../../shared/carousel-component/carousel-component';
import { AlertComponent } from '@shared/components/alert-component/alert-component';
import { AlertaTipo } from '@models/alert.type';
import { SessionService } from '@shared/services/utils/session-service';
import { ProductoHome, NoticiasHome } from '@models/data/home.items'
import { SubtituloDashboard } from "@shared/components/subtitulo-dashboard/subtitulo-dashboard";
import { ModalService } from '@shared/services/utils/modal-service';
import { FormularioGenerico } from '@shared/components/formulario-generico/formulario-generico';

@Component({
  selector: 'app-home-page',
  imports: [CarouselComponent, AlertComponent, SubtituloDashboard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  private SessionService = inject(SessionService)

  //para usar la alerta su atributos
  esVisible = signal<boolean>(false);
  tipo = signal<AlertaTipo>('success');
  mensaje = signal('');
  productoHome = [...ProductoHome]
  noticiasHome =[...NoticiasHome]

  ngOnInit(): void {
  //para mostrar el mensaje de actualizacion
    if(this.SessionService.consumoDeAlerta()) this.abrirAlerta('success', "Bienvenido Querido Usuario");
}

  abrirAlerta(tipo: AlertaTipo, mensaje: string) {
    this.esVisible.set(true);
    this.tipo.set(tipo);
    this.mensaje.set(mensaje);
  }

  //abrir modal
  modalService = inject(ModalService)
  openFormularioConsulta(){
    this.modalService.openModal(
      {
        component:FormularioGenerico,
        data:{

        }
      }
    )
  }
}
