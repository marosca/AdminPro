import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  @ViewChild('busqueda') busquedaInput: ElementRef;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();

    // this._modalUploadService.notificacion
    //   .subscribe( resp => {
    //     console.log('recibo emisión', resp);
    //     this.cargarUsuarios();
    //   });
    this._modalUploadService.notificacion.subscribe( (resp: any) => {
      console.log('subscripcion al modal desde usuarios.componente', resp);
      this._usuarioService.guardarStorage( this._usuarioService.usuario._id, this._usuarioService.token, resp.resp.usuario, null);
      this.cargarUsuarios();
    });
  }



  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe( (data: any) => {
        this.usuarios = data.usuario;
        this.totalRegistros = data.total;
        this.cargando = false;
      });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(text: string) {
    if (text.length < 1) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;

    this._usuarioService.buscarUsuario(text)
      .subscribe( (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.cargando = false;
      });
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('No se ha borrado', 'No puedes borrarte a ti mismo', 'error');
      return;
    }
    swal({
      title: '¿Está seguro de que quiere borrarlo?',
      text: 'You wont be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((borrar) => {
      if (borrar) {
        this._usuarioService.borrarUsuario(usuario)
          .subscribe((data) => {
            this.desde = 0;
            this.busquedaInput.nativeElement.value = '';
            this.cargarUsuarios();
            swal('Deleted!', 'Your file has been deleted.', 'success');
          });
      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario)
      .subscribe();
  }

  mostrarModal(id:string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

}
