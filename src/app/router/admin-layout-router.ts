import { Routes } from '@angular/router';
import { DashboardAdmin } from '../features/admin/dashboard-admin/dashboard-admin';
import { hasRolGuard } from 'app/core/guards/has-rol-guard';

export const AdminLayoutRouter: Routes = [
  {
    path: '',
    component: DashboardAdmin,
    title:'Dashboard'
  },
  {
    path: 'usuarios',
    canActivate:[hasRolGuard(['ADMIN'])],
    loadComponent: () => import('../features/admin/usuarios-admin/usuarios-admin').then(m => m.UsuariosAdmin),
    title:'Usuarios'
  },
  {
    path: 'consultas',
    canActivate:[hasRolGuard(['ADMIN'])],
    loadComponent: () => import('../features/admin/consultas-admin/consultas-admin').then(m => m.ConsultasAdmin),
    title:'Usuarios'
  },
  {
    path: 'mensajes',
    canActivate:[hasRolGuard(['ADMIN'])],
    loadComponent: () => import('../features/admin/mensajes-admin/mensajes-admin').then(m => m.MensajesAdmin),
    title:'Usuarios'
  },
  {
    path: 'productos',
    canActivate:[hasRolGuard(['ADMIN'])],
    loadComponent: () => import('@page-admin/productos-admin/productos-admin').then(m => m.ProductosAdmin),
    title:'Usuarios'
  },
  {
    path: 'perfil-login',
    canActivate:[hasRolGuard(['ADMIN', 'USUARIO'])],
    loadComponent: () => import('@page-admin/usuario-logeado/perfil-usuario/perfil-usuario'),
    title:'Perfil'
  },
   {
    path: 'actualizar-perfil',
    canActivate:[hasRolGuard(['ADMIN', 'USUARIO'])],
    loadComponent: () => import('@page-admin/usuario-logeado/actualizar-perfil/actualizar-perfil'),
    title:'Actualizar Perfil'
  },
]
