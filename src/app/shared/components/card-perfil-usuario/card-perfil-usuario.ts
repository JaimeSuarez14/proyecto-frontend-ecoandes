import { Component, input } from '@angular/core';

@Component({
  selector: 'card-perfil-usuario',
  imports: [],
  templateUrl: './card-perfil-usuario.html',
  styleUrl: './card-perfil-usuario.css'
})
export class CardPerfilUsuario {
  icono = input("");
  title =  input("");
  propiedad = input("")
}
