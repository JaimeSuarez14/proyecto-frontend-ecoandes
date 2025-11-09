import { SessionService } from '@shared/services/session-service';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, effect, HostListener, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@shared/services/auth-service';
import { HasAuth } from "app/core/directives/has-auth";

@Component({
  selector: 'app-client-header',
  imports: [CommonModule, RouterLink, RouterLinkActive, HasAuth, TitleCasePipe],
  templateUrl: './client-header.html',
  styleUrl: './client-header.css'
})
export class ClientHeader {
  authService = inject(AuthService);
  // Signal para manejar el estado de colapso del menú
  sessionService =  inject(SessionService)
  isOpen = signal(false);
  isDropdownOpen = signal(false);
  screenWidth: number = window.innerWidth;

  constructor(){
    effect(() =>{
      const isDark = this.sessionService.isDark$()
      if(isDark){
        document.documentElement.classList.add("dark")
      }else{
        document.documentElement.classList.remove("dark")
      }
    });
  }

  // Función para alternar el estado del menú
  toggleNavbar() {
    this.isOpen.update(value => !value);
  }
  toggleDropdown(){
    this.isDropdownOpen.update(value => !value);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    this.screenWidth = (event.target as Window).innerWidth;
    if (this.screenWidth > 768) {
      this.isOpen.set(false);
    }else {
      this.isOpen.set(true);
    }
  }

  cerrarSesion(){
    this.authService.logout()
  }
}
