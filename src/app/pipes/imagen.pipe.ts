import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: any, tipo: any = 'usuario'): any {
    let url = `${URL_SERVICIOS}/img/`;
    if (!img) {
      return url + '/usuarios/sinImagen'; //en el backend está configurada una imagen por defecto
    }
    //si tiene https quiere decir que el usaurio se logueó desde google y la imagen es de google
    if (img.includes('https')) {
      return img;
    }
    switch (tipo) {
      case 'usuario':
        url += 'usuarios/' + img;
        break;
      case 'hospital':
        url += 'hospitales/' + img;
        break;
      case 'medico':
        url += 'medicos/' + img;
        break;
      default:
        console.log('tipo de iamgen no existe');
         url += '/usuarios/sinImagen';
        break;
    }

    return url;
  }

}
