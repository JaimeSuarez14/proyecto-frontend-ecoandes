import { Component, computed, effect, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@shared/services/user-service';

@Component({
  selector: 'busqueda-input',
  imports: [FormsModule],
  templateUrl: './busqueda-input.html',
  styleUrl: './busqueda-input.css'
})
export class BusquedaInput {
  buscarPalabra =  signal("");
  store = inject(UserService);
  router = inject(Router);
  enviarResultado =  output<string>()

  constructor(){
    effect(() => {
      if(this.buscarPalabra()===""){ this.onSearch()}
    })

  }
  //Estado para mostrar/ocultar las sugerencias
  focused = true;

  // Computed reactivo que genera sugerencias dinámicas
  suggestions = computed(() => {
    const term = this.buscarPalabra().toLowerCase().trim();
    if (!term){
      this.focused = true;
      return [];
    }
    const allNames = this.store.usuarios().map((p) => p.nombreCompleto);
    // Sugerencias que contengan el texto ingresado
    return allNames
      .filter((name) => name.toLowerCase().includes(term))
      .slice(0, 5); // máximo 5 sugerencias
  });

  // 🚀 Buscar al presionar Enter o hacer click
  onSearch() {
    this.focused = false;
    // if(this.buscarPalabra().length===0){
    //   alert("Ingrese el nombre a buscar");
    //   return;
    // }
    this.enviarResultado.emit(this.buscarPalabra())
  }

  // 👆 Seleccionar sugerencia de la lista
  selectSuggestion(s: string) {
    this.buscarPalabra.set(s);
    this.onSearch();
  }

  cerrarbusqueda(){
    this.buscarPalabra.set("");
  }
}
