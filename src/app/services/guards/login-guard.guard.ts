import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if ( this._usuarioService.estaLogueado()) {
        return true;
      } else {
        console.log('BLOQUEADO POR EL GUARD DEL LOGIN');
        this.router.navigate(['/login']);
        return false;
      }
  }
}
