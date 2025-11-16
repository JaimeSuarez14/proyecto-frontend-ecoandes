import { Mensaje } from './../../../core/model/mensaje.model';
import { Consulta, ConsultaDto } from '@models/consulta.model';
import { signal } from '@angular/core';
import { Component, inject, computed } from '@angular/core';
import { SubtituloDashboard } from "@shared/components/subtitulo-dashboard/subtitulo-dashboard";
import { PaginacionLinkedsignal } from "@shared/components/paginacion-linkedsignal/paginacion-linkedsignal";
import { ConsultaService } from '@shared/services/consulta-service';
import { KeyColumns } from '@models/utils/columns.table';
import { SpinerCargando } from "@shared/components/spiner-cargando/spiner-cargando";
import { BusquedaInput } from "@shared/components/busqueda-input/busqueda-input";
import { BotonGenerico } from "@shared/components/utils/boton-generico/boton-generico";
import { ModalService } from '@shared/services/utils/modal-service';
import { ModalContainerComponent } from "@shared/components/modal-container-component/modal-container-component";
import { AlertConfirmacion } from "@shared/components/alert-confirmacion/alert-confirmacion";
import { ConfirmacionService } from '@shared/services/utils/confirmacion-service';

@Component({
  selector: 'app-consultas-admin',
  imports: [SubtituloDashboard, PaginacionLinkedsignal, SpinerCargando, BusquedaInput, BotonGenerico, ModalContainerComponent, AlertConfirmacion],
  templateUrl: './consultas-admin.html',
  styleUrl: './consultas-admin.css'
})
export class ConsultasAdmin {
  consultaService = inject(ConsultaService)
  //modo clasico con rxjs llamada al httpclient
  columnsConsulta: KeyColumns<ConsultaDto>[] =[
    { key: "user", label:"Usuario"},
    { key: "asunto", label:"Asunto"},
    { key: "contenido", label:"Contenido"},
    { key: "estado", label:"Estado"},
    { key: "respuesta", label:"Respuesta"},
  ]
  consultasRXJS = computed( () => {
    if(!this.consultaService.consultas.hasValue()) return [];
    const consultasRes: Consulta[] =  this.consultaService.consultas.value();
    //transformacion
    let consultas = consultasRes?.map( c => {return {...c, user: c.user.username}})
    const username = this.searchName().toLowerCase()
    if(username.trim().length>=0){
      consultas = consultas.filter(c => c.user.toLowerCase().includes(username))
    }
    return consultas
  })

  //busqueda por el username del usuario
  listName = computed(() => this.consultasRXJS()!.map(c => c.user))
  searchName =  signal("");
  recibirResultado(respuest: string){
    this.searchName.set(respuest);
  }

  reload(){
    this.consultaService.consultas.reload()
  }

  modalService = inject(ModalService)

  openModal() {
      this.modalService.openModal({
        component: SpinerCargando, // Componente a renderizar
        data: {
          mensaje:'Cargando...',
          isColor:true,
          size:'xl',
        },
        width: '600px', // Ancho personalizado
        height: '390px',
      });
  }

  confirmacionService =  inject(ConfirmacionService)
  abrirConfirmacion(){
    this.confirmacionService.confirm("Esta accion requiere un tiempo, espera por favor",'info')
  }

}
