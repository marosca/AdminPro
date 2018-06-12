import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
  menu: Array<Object> = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-guage',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'ProgressBar', url: '/progress' },
        { titulo: 'Gráficas', url: '/graficas1' },
      ]
    }];

  constructor() { }

}
