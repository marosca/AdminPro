import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SubirArchivoService {

  constructor(public http: HttpClient) { }

  // ===================================================== //
  //           subirArchivo con vanillaJs
  // ===================================================== //
  subirArchivo(archivo: File, tipo: string, id: string) { // tipo --> medico/usuario/hospital
    return new Promise((resolve, reject) => {
      // https://developer.mozilla.org/es/docs/Web/Guide/Usando_Objetos_FormData
      let formData = new FormData(); // vanilla js
      let xhr = new XMLHttpRequest(); // vanilla js

      formData.append('img', archivo, archivo.name);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('imagen subida');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('falló la subida');
            reject(xhr.response);
          }
        }
      };

      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send(formData);
    }); // fin promesa;
  } // fin subirArchivo

  // ===================================================== //
  //           subirArchivo con angular
  // ===================================================== //
  fileUpload(fileItem: File, tipo: string, id: string) {
    const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
    const formData: FormData = new FormData();
    formData.append('img', fileItem, fileItem.name);
    return this.http.put(url, formData, { reportProgress: true });
  }
}
