import { Component } from '@angular/core';
import { SettingsService } from './services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public _ajustesSetting: SettingsService, public router: Router) {
    this.router.onSameUrlNavigation = 'reload';
  }
}
