import { Component, computed, inject, linkedSignal, OnInit, signal } from '@angular/core';
import { UserService } from '@shared/services/user-service';
import { Usuario } from 'app/core/model/Usuario';
import { SpinerCargando } from "@shared/components/spiner-cargando/spiner-cargando";
import { AuthService } from '@shared/services/auth-service';
import { SubtituloDashboard } from "@shared/components/subtitulo-dashboard/subtitulo-dashboard";
import { BusquedaInput } from "@shared/components/busqueda-input/busqueda-input";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios-admin',
  imports: [SpinerCargando, SubtituloDashboard, BusquedaInput, FormsModule],
  templateUrl: './usuarios-admin.html',
  styleUrl: './usuarios-admin.css'
})
export class UsuariosAdmin implements OnInit{
  userService = inject(UserService)
  authService = inject(AuthService)
  currentUsers = computed(()=>this.userService.usuarios().filter(u => u.username !== this.authService.currentUserAuth$()?.username))
  //filtro por rol
  activeFiltroRol = signal<boolean>(false);
  checkedRol = signal(false);
  //filtro por email
  activeFiltroEmail = false;
  searchEmail = signal("");

  //filtro por username
  searchUsername = signal("");

  searchName = signal("");

  constructor(){
  }

  ngOnInit(): void { // 👈 LLAMA AQUÍ
  }

  editarMensaje(usuario: Usuario){

  }

  eliminarMensaje(id: number){}

  cambiarFiltroRol(){
    this.checkedRol.update( c => !c)
  }

  activarFiltroEmail(){
    this.activeFiltroEmail = !this.activeFiltroEmail;
  }

  resetFiltros(){
    this.searchUsername.set("");
    this.searchEmail.set("");
    this.activeFiltroEmail =  false;
    this.activeFiltroRol.set(false);
    this.checkedRol.set(false);
  }

  recibirNombre(nombre:string){
    this.searchName.set(nombre);
  }

  listaFiltrada = linkedSignal(()=>{
    const email =  this.searchEmail();
    const username =  this.searchUsername();
    const rol = this.checkedRol();
    const name = this.searchName()
    let lista =  this.currentUsers();

    if(email.length>0){
      lista = lista.filter( u => u.email.includes(email) )
    }

    if(username.length>0){
      lista = lista.filter( u => u.username.includes(username) )
    }

    if(this.activeFiltroRol() ){
      const rolUsuario = rol ? "USUARIO" : "ADMIN";
      lista = lista.filter( u => u.rol?.includes(rolUsuario) )
    }

    if(name && name.length>0){
      lista = lista.filter( u => u.nombreCompleto.includes(name) )
    }

    return lista;
  })
}
