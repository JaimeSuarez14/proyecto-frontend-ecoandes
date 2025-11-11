import { Component, input, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '@models/Usuario';

@Component({
  selector: 'app-filtros-tablas',
  imports: [FormsModule],
  templateUrl: './filtros-tablas.html',
  styleUrl: './filtros-tablas.css',
})
export class FiltrosTablas {
  currentUsernames= input<string [] | null>(null);
  //filtro por username
  searchUsername = model('');
  //filtro por email
  activeFiltroEmail = false;
  searchEmail = model('');
   //filtro por rol
  activeFiltroRol = model<boolean>(false);
  checkedRol = model(false);

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
}
