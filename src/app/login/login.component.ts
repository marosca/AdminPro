import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function init_plugins_jquery();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    init_plugins_jquery();
  }

  ingresar() {
    console.log('aqiu');
    this.router.navigate(['/dashboard']);
  }

}
