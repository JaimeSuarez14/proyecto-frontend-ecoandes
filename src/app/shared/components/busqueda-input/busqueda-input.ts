import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'busqueda-input',
  imports: [FormsModule],
  templateUrl: './busqueda-input.html',
  styleUrl: './busqueda-input.css'
})
export class BusquedaInput {
  buscarPalabra =  signal("");
  enviarResultado =  output<string>()
  data = input.required<string[]>()

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
    return this.data().filter((name) => name.toLowerCase().includes(term))
      .slice(0, 5); // máximo 5 sugerencias
  });

  // Buscar al presionar Enter o hacer click
  onSearch() {
    this.focused = false;
    this.enviarResultado.emit(this.buscarPalabra())
  }

  // Seleccionar sugerencia de la lista
  selectSuggestion(s: string) {
    this.buscarPalabra.set(s);
    this.onSearch();
  }

  cerrarbusqueda(){
    this.buscarPalabra.set("");
  }
}
