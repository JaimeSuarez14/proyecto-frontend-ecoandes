import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, resource, signal } from '@angular/core';
import { Consulta } from '@models/consulta.model';
import { single } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
  httpUrl = signal<string>("http://localhost:8080/api/consulta");
  http =  inject(HttpClient)
  consultas = httpResource<Consulta[]>( () => this.httpUrl())

  constructor(){
  }

  // userResourceAllConsultas = resource({
  //   params: () => ({ id: this.httpUrl() }),
  //   loader: async ({params, abortSignal}) => {
  //     return (await fetch(params.id)).json()}

  // });

  obtenerConsultas() {
    return this.http.get<Consulta[]>(this.httpUrl()).subscribe({
      next:E => this.consultas.set(E)
    })
  }

}
