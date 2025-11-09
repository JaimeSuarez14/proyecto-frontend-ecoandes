import { Component, input } from '@angular/core';

@Component({
  selector: 'app-popover',
  imports: [],
  template: `
    <span class="absolute group-hover:visible font-medium top-0 left-11 z-100 invisible inline-block w-auto px-2  py-1 text-sm text-white transition-opacity duration-300 bg-blue-500 border group-hover:opacity-100 border-blue-200 rounded-lg shadow-xs opacity-0">{{contenido()}}</span>
  `,
  styles: ``
})
export class Popover {
  contenido = input<string>()
}
