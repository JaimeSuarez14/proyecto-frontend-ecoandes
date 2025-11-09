export interface Usuario {
  id?: number;
  nombreCompleto: string;
  username: string;
  password: string;
  email: string;
  celular: string;
  direccion: string;
  fechaRegistro?: string;
  rol?: string;
  estado?: string;
}

export interface UsuarioResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserAuthenticate {
  email: string;
  rol?: string;
  username: string;
  nombreCompleto: string;
  direccion: string;
}
