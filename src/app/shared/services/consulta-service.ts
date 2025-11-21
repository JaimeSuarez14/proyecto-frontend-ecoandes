import { HttpClient, httpResource } from '@angular/common/http';
import {
  EnvironmentInjector,
  inject,
  Injectable,
  resource,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ApiResponse } from '@models/api-response.model';
import { Consulta } from '@models/consulta.model';
import { firstValueFrom, Observable, single } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
  httpUrl = signal<string>('http://localhost:8080/api/consulta');
  http = inject(HttpClient);
  consultas = httpResource<Consulta[]>(() => this.httpUrl());
  consultaService: any;

  constructor() {}

  // userResourceAllConsultas = resource({
  //   params: () => ({ id: this.httpUrl() }),
  //   loader: async ({params, abortSignal}) => {
  //     return (await fetch(params.id)).json()}

  // });

  obtenerConsultas() {
    return this.http.get<Consulta[]>(this.httpUrl()).subscribe({
      next: (E) => this.consultas.set(E),
    });
  }

  async crearConsulta(newConsulta: Consulta): Promise<boolean> {
      try {
        const response = await firstValueFrom(
          this.http.post<ApiResponse>(`${ this.httpUrl() }/create`, newConsulta
          )
        );
        return response.status === 'success';
      } catch (error) {
        console.error('Error al verificar contraseña', error);
        return false;
      }
    }
}
