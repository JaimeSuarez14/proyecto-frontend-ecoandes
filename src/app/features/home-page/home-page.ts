import { Component, inject, OnInit, signal } from '@angular/core';
import { CarouselComponent } from '../../shared/carousel-component/carousel-component';
import { AlertComponent } from '@shared/components/alert-component/alert-component';
import { AlertaTipo } from '@models/alert.type';
import { SessionService } from '@shared/services/utils/session-service';


@Component({
  selector: 'app-home-page',
  imports: [CarouselComponent, AlertComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  private SessionService = inject(SessionService)

  //para usar la alerta su atributos
  esVisible = signal<boolean>(false);
  tipo = signal<AlertaTipo>('success');
  mensaje = signal('');

ngOnInit(): void {
  //para mostrar el mensaje de actualizacion
    if(this.SessionService.consumoDeAlerta()) this.abrirAlerta('success', "Bienvenido Querido Usuario");
}

  abrirAlerta(tipo: AlertaTipo, mensaje: string) {
    this.esVisible.set(true);
    this.tipo.set(tipo);
    this.mensaje.set(mensaje);
  }
}
