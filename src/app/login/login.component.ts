import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import swal from 'sweetalert2';

declare function init_plugins_jquery();
// Google API
declare const gapi: any; // le estamos diciendo a angular que existe una libreria llamada gapi (y existe porque está importada nel e index con una etiqueta script src)
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  correo: string;

  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.googleInit();
    init_plugins_jquery();
    this.correo = localStorage.getItem('email') || ''; // si esta guardado el email en el localstorage es porque se dijo que se quería recorarda..a sí que se pintan el input con [ngModel]="correo"
    this.recuerdame = !!this.correo; // si hay correo, que es´te marcada la casilla de recuerdame
  }

  // Login con el bootón de Google
  // Inicialización de los servicios de google
  googleInit() {

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '364256299290-of6h8ns6vujv7bec3h0ijmd27hac7mpp.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );

    });

  }
  // fUncion que se ejecuta cuando se pulsa el botón de google
  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {

      let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle( token )
              .subscribe( correcto => window.location.href = '#/dashboard');

    });

  }


  ingresar(forma: NgForm) {
    console.log('forma', forma);
    if (forma.invalid) { return; }

    let user: Usuario;
    user = {
      nombre: null,
      email: forma.value.correo,
      password: forma.value.password
    };

    /*let usuario = new Usuario( //se puede hacer tambien así
      null,
      forma.value.correo,
      forma.value.password
    );*/
    this._usuarioService.login(user, forma.value.recuerdame)
      .subscribe(
        correcto => this.router.navigate(['/dashboard']),
        error => swal('Usuario desconocido', 'Introduce correctamente tus datos', 'error')
      );

  }

}
