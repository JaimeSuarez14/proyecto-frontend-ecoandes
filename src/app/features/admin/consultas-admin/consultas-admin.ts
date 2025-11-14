import { Consulta, ConsultaDto } from '@models/consulta.model';
import { signal } from '@angular/core';
import { Component, inject, computed } from '@angular/core';
import { SubtituloDashboard } from "@shared/components/subtitulo-dashboard/subtitulo-dashboard";
import { PaginacionLinkedsignal } from "@shared/components/paginacion-linkedsignal/paginacion-linkedsignal";
import { ConsultaService } from '@shared/services/consulta-service';
import { KeyColumns } from '@models/utils/columns.table';

@Component({
  selector: 'app-consultas-admin',
  imports: [SubtituloDashboard, PaginacionLinkedsignal],
  templateUrl: './consultas-admin.html',
  styleUrl: './consultas-admin.css'
})
export class ConsultasAdmin {
  consultaService = inject(ConsultaService)

  //modifique el backend para que no necesite autorizacion de token porque aun no hace el interceptos a resources.
  consultas = computed(() => this.consultaService.userResourceAllConsultas.value()! as Consulta[])
  columnsConsultas: KeyColumns<Consulta>[] =[
    { key: "user", label:"Usuario"},
    { key: "asunto", label:"Asunto"},
    { key: "contenido", label:"Contenido"},
    { key: "estado", label:"Estado"},
    { key: "respuesta", label:"Respuesta"},
  ]

  //modo clasico con rxjs llamada al httpclient
  columnsConsulta: KeyColumns<ConsultaDto>[] =[
    { key: "user", label:"Usuario"},
    { key: "asunto", label:"Asunto"},
    { key: "contenido", label:"Contenido"},
    { key: "estado", label:"Estado"},
    { key: "respuesta", label:"Respuesta"},
  ]
  consultasRXJS = computed( () => {
    const consultas =  this.consultaService.consultas();
    return consultas?.map( c => {return {...c, user: c.user.username}})
  })
}
