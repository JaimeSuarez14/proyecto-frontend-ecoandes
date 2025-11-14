import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  //esta clases sirve para alertas al iniciar o obtener, se muestra la primera vez que se lancen
  private marcadorVentana = signal(true);
  private isDark =  signal(true);
  readonly isDark$ =  this.isDark.asReadonly();

  ventanaMarcada() {
    this.marcadorVentana.set(true);
  }

  consumoDeAlerta(): boolean {
    const valor = this.marcadorVentana();
    this.marcadorVentana.set(false);
    return valor;
  }

  cambiarTema(){
    this.isDark.update(is => !is)
  }

}
