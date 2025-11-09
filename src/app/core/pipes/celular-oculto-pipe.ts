import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numeroOculto'
})
export class CelularOcultoPipe implements PipeTransform {

  transform(value: string | undefined, ...args: unknown[]): string {
    if(!value) return "";
    const visibles = value!.slice(0, 3);
    const ocultos = '*'.repeat(value!.length - 3);
    return visibles + ocultos;
  }

}
