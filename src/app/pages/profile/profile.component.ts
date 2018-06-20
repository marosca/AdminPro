import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenAsubir: File;
  imagenTemp;

  constructor(public _usuarioService: UsuarioService) {

  }

  ngOnInit() {
    this.usuario = {...this._usuarioService.usuario}; //copia del objeto
  }

  guardar( usuario: Usuario) {

    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) { // si el usuario se logueo con cuenta de google no le dejo modificar el email
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario(this.usuario)
      .subscribe();
  }

  seleccionImagen ($event) {
    let archivo = $event.target.files[0];
    if (!archivo) {
      this.imagenAsubir = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      swal('Sólo imágenes', 'El archivo selecionado no es una imagen', 'error');
      this.imagenAsubir = null;
      return;
    }

    this.imagenAsubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenAsubir, this.usuario._id);
  }

}
