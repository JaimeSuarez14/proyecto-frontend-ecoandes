import { Component } from '@angular/core';

@Component({
  selector: 'app-nosotros-page',
  imports: [],
  templateUrl: './nosotros-page.html',
  styleUrl: './nosotros-page.css'
})
export class NosotrosPage {
  valores= [
    {nombre:'Sostenibilidad', icono : 'bi-globe'},
    {nombre:'Calidad', icono : 'bi-award'},
    {nombre:'Etica', icono : 'bi-star '},
    {nombre:'Innovación', icono : 'bi-hand-thumbs-up'},
  ];
}
