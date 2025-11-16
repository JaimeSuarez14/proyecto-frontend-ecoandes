import { Component, input, output } from '@angular/core';

@Component({
  selector: 'boton-generico',
  imports: [],
  template: `
    <button class="bg-green-800 flex gap-2 items-center text-white font-semibold py-2 px-3 rounded-lg hover:bg-green-700 transition-colors" aria-label="Clear filters" role="button" (click)="ejecutarAccion()">
        <i [class]="icono()"></i><span>{{mensaje()}}</span>
    </button>
  `,
  styles: ``,
})
export class BotonGenerico {
  mensaje = input.required<string>();
  icono = input<string>();
  clicked = output<void>();
  valorEmitido = input<any>(); // opcional

  ejecutarAccion() {
  const valor = this.valorEmitido?.();
  if (valor !== undefined && valor !== null) {
    this.clicked.emit(valor);
  } else {
    this.clicked.emit(); // emite sin valor
  }
}

}
