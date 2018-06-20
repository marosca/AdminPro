import { Component, OnInit } from '@angular/core';
declare function init_plugins_jquery();

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins_jquery();
  }

}
