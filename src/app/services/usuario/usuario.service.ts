import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    console.log('cargado el servicio de usuarios');
    this.cargarStorage();
   }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: string) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  cargarStorage() {
    console.log('Cargado datos de usuario desde el servicio');
    this.usuario = JSON.parse(localStorage.getItem('usuario')) || null;
    this.token = localStorage.getItem('token') || null;
  }

  logout() {
    this.usuario = null;
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usaurio');
    this.router.navigate(['/login']);
  }

  login(usuario: Usuario, recuerdame: boolean = false) {
    let url = URL_SERVICIOS + '/login';
    if (recuerdame) {
      localStorage.setItem('email', usuario.email); //guarda el email introducido aunque sea incorrecto
    } else {
      localStorage.removeItem('email');
    }
    return this.http.post(url, usuario)
      .map( (resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, null);
        return true; // retorna true para determinar que se logueó
      });
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token})
      .map( (resp: any) => {
        this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
        return true;
      });
  }

  crearUsuario(usuario: Usuario, notify: boolean): Observable<any> {
    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
      .map((response: any) => {
          if (notify) {
             swal('Usuario creado', usuario.email, 'success');
          }
          return response.usuario; // usuario lo hemos creado en el back en la respuesta
      });
  }

  estaLogueado(): boolean {
    return !!this.token; //si hay token regresa tru;w
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario)
      .map( (resp: any) => {
        /* esta función se usa cuando un usuario actualiza sus propios datos
        o cuando un administrador en la pagina de mantenimiento hace un cambio
        de role a un usuario. ASí que primero vemos que si el usuario que se
        está intentando modificar es el que está logueado tendreos que actualizar
        los datos del localstorage */
        if (usuario._id === this.usuario._id) {
          let userBD: Usuario = resp.usuario;
          this.guardarStorage(userBD._id, this.token, userBD, null);
        }
        swal('Usuario modificado', usuario.nombre, 'success');
      });
  }

  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then( (resp: any) => {
        this.usuario.img = resp.usuario.img;
        // console.log(resp);
        swal('Imagen actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario, null);
      })
      .catch( error => {
        console.log(error);
        swal('Error al actualizar', error, 'error');
      });
  }

  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuario(text: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + text;
    return this.http.get(url)
      .map( (resp:any) => {
        return resp.usuarios;
      });
  }

  borrarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;
    return this.http.delete(url);
  }

}
