import { Usuario } from "./Usuario";

export interface Consulta {
  id: number;
  user: Usuario;
  asunto: string;
  contenido: string;
  fechaRegistro: string;
  estado: EstadoConsulta;
  respuesta: string;
  fechaRespuesta: string;
}

type EstadoConsulta =  'Pendiente' | 'Resuelto';

export interface ConsultaDto {
  id: number;
  user: string;
  asunto: string;
  contenido: string;
  fechaRegistro: string;
  estado: EstadoConsulta;
  respuesta: string;
  fechaRespuesta: string;
}
