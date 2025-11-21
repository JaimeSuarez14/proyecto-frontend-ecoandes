import { Component, computed, input, signal } from '@angular/core';
import { NoticiaItem } from '@models/data/noticia.items';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-contenido-noticia',
  imports: [RouterLink],
  templateUrl: './contenido-noticia.html',
  styleUrl: './contenido-noticia.css',
})
export class ContenidoNoticia {
  id= input.required<string>();
  noticias = [...NoticiaItem]
  noticiaSelect = computed(() => {
    return this.noticias.find(n => n.id.toString()===this.id() )
  })
  isOpen=signal(false);

}
