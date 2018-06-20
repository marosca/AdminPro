import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  constructor(
    public _sidebar: SidebarService,
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this._modalUploadService.notificacion.subscribe((resp: any) => {
      console.log('respuesta desde sidebar', resp);
      if (resp.tipo === 'usuarios') {
        this.usuario = resp.resp.usuario;
      }
    });
  }
}
