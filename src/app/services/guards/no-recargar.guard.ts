import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NoRecargarGuard implements CanActivate {
  constructor(public router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let to = state.url;
      let from = this.router.url;
      //console.log('norecargar guard', to, from);
      if (from !== to) {
        // console.log('puedes entrar, son rutas diferentes');
        return true;
      } else {
        // console.log('vienes de la misma página');
        return false;
      }
  }
}
