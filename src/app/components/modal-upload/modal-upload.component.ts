import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

import swal from 'sweetalert2';
import { EventEmitter } from 'events';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenAsubir: File;
  imagenTemp;
  @ViewChild('inputFile') inputFile:ElementRef;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService) {
    console.log('modal Componente cargado');
  }

  ngOnInit() {
  }

  seleccionImagen ($event) {
    let archivo = $event.target.files[0];
    if (!archivo) {
      this.imagenAsubir = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      swal('Sólo imágenes', 'El archivo selecionado no es una imagen', 'error');
      this.imagenAsubir = null;
      return;
    }

    this.imagenAsubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenAsubir = null;
    this.inputFile.nativeElement.value = '';
    this._modalUploadService.ocultarModal();
  }


  subirImagen() {
    this._subirArchivoService.subirArchivo(this.imagenAsubir, this._modalUploadService.tipo, this._modalUploadService.id)
      .then( (resp:any) => {
        console.log('emitiendo respuesta desde el modalService', resp);
        // emitimos el en el objeto notificación la respuesta dl servidor
        // para saber que si se ha subido o no la imagen
        // this._modalUploadService.notificacion.emit( resp );
        this._modalUploadService.notificacion.emit( {resp: resp,
          tipo: this._modalUploadService.tipo}
          );
        this.cerrarModal();
      })
      .catch( error => console.log('Error en la carga', error));
  }

}
