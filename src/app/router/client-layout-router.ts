import { Routes } from '@angular/router';
import { HomePage } from '../features/home-page/home-page';
import { Noticias } from 'app/features/home-page/noticias/noticias';

export const ClientLayoutRouter: Routes = [
  {
    path: '',
    component: HomePage,
  },

  {
    path: 'productos',
    loadComponent: () => import('../features/producto-page-client/producto-page-client').then(m => m.ProductoPageClient),
    title:'productos'
  },
  {
    path:'nosotros',
    loadComponent: () => import('../features/nosotros-page/nosotros-page').then(c => c.NosotrosPage),
    title:'nosotros'
  },
  {
    path:'contacto',
    loadComponent: () => import('../features/contacto-page/contacto-page').then(c => c.ContactoPage),
    title:'Contacto'
  },
  {
    path:'login',
    loadComponent: () => import('../features/login-page/login-page').then(c => c.LoginPage),
    title:'Login'
  },
  {
    path:'register',
    loadComponent: () => import('../features/register-page/register-page').then(r => r.RegisterPage),
    title:'Registro'
  },
  {
    path:'noticia/:id',
    component: Noticias,
    title:'Sección Noticias'
  }

]
