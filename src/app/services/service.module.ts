import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  SharedService,
  SidebarService,
  SettingsService,
  UsuarioService,
  LoginGuardGuard
} from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule // se necesita este modulo al usar el HttpClient en un servicio dentro de un módulo
  ],
  declarations: [],
  providers: [
    SharedService,
    SidebarService,
    SettingsService,
    UsuarioService,
    LoginGuardGuard
  ]
})

export class ServiceModule { }
