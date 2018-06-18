import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    console.log('servicio de usuario lista');
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

}
