import { Component, inject, input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContenidoNoticia } from '@shared/components/contenido-noticia/contenido-noticia';

@Component({
  selector: 'app-noticias',
  imports: [ContenidoNoticia],
  templateUrl: './noticias.html',
  styleUrl: './noticias.css',
})
export class Noticias {

    noticiaId = signal('');
    private activatedRoute = inject(ActivatedRoute);

    constructor() {
    // Access route parameters
    this.activatedRoute.params.subscribe((params) => {
      this.noticiaId.set(params['id']);
    });
  }

}
