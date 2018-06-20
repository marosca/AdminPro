import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
//import { HttpModule } from '@angular/http';
import {
  SharedService,
  SidebarService,
  SettingsService,
  UsuarioService,
  LoginGuardGuard,
  NoRecargarGuard,
  SubirArchivoService
} from './service.index';

import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
  imports: [
    CommonModule,
    //HttpModule, // se necesita esto también al usar el servicio ModalUploadService daba el error ERROR Error: Uncaught (in promise): Error: StaticInjectorError[e]. Lo he importado y se ha arrglado.. y luego lo he quito y funcionaba
    HttpClientModule // se necesita este modulo al usar el HttpClient en un servicio dentro de un módulo
  ],
  declarations: [],
  providers: [
    SharedService,
    SidebarService,
    SettingsService,
    UsuarioService,
    LoginGuardGuard,
    NoRecargarGuard,
    SubirArchivoService,
    ModalUploadService
  ]
})

export class ServiceModule { }
