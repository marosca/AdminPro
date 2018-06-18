import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert2';

import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';


declare function init_plugins_jquery();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  editing: boolean = false;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      let campo1Value = group.controls[campo1].value,
        campo2Value = group.controls[campo2].value,
        ret = (campo1Value ===  campo2Value) ? null : { sonIguales: true}; // null pasa la validación
      return ret;
    };
  }

  ngOnInit() {
    init_plugins_jquery();
    let sinDatos = {value: '', disabled: true };
    this.forma = new FormGroup({
      nombre: new FormControl(sinDatos, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales('password', 'password2') });


    this.forma.setValue({
      nombre: 'Test',
      correo: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  resgistrarUsuario() {
    if (this.forma.invalid) {
      return;
    }
    if (!this.forma.value.condiciones) {
      swal('Importante', 'Debe aceptar las condiciones', 'info');
      return;
    }
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario(usuario, true) //segundo parametro para decir si notifica en el front end la creacción correcta de usuario
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/login']);
      },
        error => console.log(error)
      );
    }
    editar() {
      let data = this.forma.controls.nombre.value;
      let status = this.forma.controls.nombre.disabled;
      this.forma.controls.nombre.reset({value: data, disabled: !status});
    }
}
