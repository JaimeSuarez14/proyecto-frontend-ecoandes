import { Routes } from '@angular/router';
import { ClientLayout } from './layout/client-layout/client-layout';
import { ClientLayoutRouter } from './router/client-layout-router';
import { AdminLayoutRouter } from './router/admin-layout-router';
import { authGuardGuard } from './core/guards/auth-guard-guard';

export const routes: Routes = [
  {
    path:'',
    component: ClientLayout,
    children: ClientLayoutRouter,
  },
  {
    path:"admin",
    canMatch:[authGuardGuard],
    loadComponent: () => import('./layout/admin-layout/admin-layout').then(c => c.AdminLayout),
    title:'admin',
    children: AdminLayoutRouter,
  },
  {
    path:"**",
    redirectTo:""
  }
];
