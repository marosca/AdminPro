import { Routes, RouterModule } from "@angular/router";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from "./profile/profile.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'}},
      {path: 'progress', component: ProgressComponent, data: {titulo: 'Progreso'}},
      {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficos'}},
      {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
      {path: 'rxjs', component: RxjsComponent, data: {titulo: 'Observables'}},
      {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Settings del tema'}},
      {path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario'}},
      // Mantenimiento
      {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimiento de usuarios'}},
      {path: 'medicos', component: UsuariosComponent, data: {titulo: 'Mantenimiento de médicos'}},
      {path: 'hospitales', component: UsuariosComponent, data: {titulo: 'Mantenimiento de hospitales'}},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
