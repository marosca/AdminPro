import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  estilos: string = 'selector ';

  constructor(public _ajustesService: SettingsService) {}

  ngOnInit() {
    this.colocarCheckAlInicio();
  }

  cambiarColor(tema, link) {
    this._ajustesService.aplicarTema(tema);
    this.aplicarCheck(link);
  }

  aplicarCheck(link) {
    link.classList.add('working');
    const links: Array<Element> = Array.from(document.getElementsByClassName('selector'));
    links.forEach((el) => el.classList.remove('working'));
  }

  colocarCheckAlInicio() {
    const link = document.getElementsByClassName(`${this._ajustesService.ajustes.tema}-theme`)[0];
    link.classList.add('working');
  }

}
