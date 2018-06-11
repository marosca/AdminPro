import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  @Input() leyenda: string = 'Leyenda'; // para renombrar los inputs... se le pasa como leyenda, pero seh a renombrado a nombre -> @Input('nombre') leyenda: string
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  @ViewChild('txtProgress') txtProgress: ElementRef;

  constructor() {
    console.log(this.leyenda); // en ese momento pondrá 'Leyenda' porque aun no ha recibido datos del input
  }

  ngOnInit() {
    console.log(this.leyenda); // aquí ya tendrá acceso a lo que haya pasado su componente padre
  }

  changeProgress( value: number ) {
    this.progreso += value;
    if (this.progreso > 100) {
      this.progreso = 100;
    }
    if (this.progreso < 0) {
      this.progreso = 0;
    }
    this.cambioValor.emit(this.progreso); // emite el cambio
    this.txtProgress.nativeElement.focus(); // pasa foco al input
  }

  onChange( newValue: number ) {
    // todo handle de evento tiene un argumento llamado event,
    //que accede al evento (pero no funciona en firefox, da error);
    console.log(event);
    /* La función onChange es lanzada cada vez que se dispara el event change del
    input (cuando se cambia el valor escribiendo en el input. El input tiene un ngModel
    de manera que está bindeado ese valor a la variable del 'progreso' del
    componente. Se hacen una comprobaciones previas, para eviar this.progreso sea mayor a
    100 o menor a 0. Sin embrago es ncesario setear el value de input porque si el usuario
    escribe por ejempolo 10000000, el progreso se quedará a 100, pero en el input se ve
    que el usuario ha escrito un número muy grande. Par ahacer esto o bien accedmos
    con vanila js al inputy le decimos cuale es su value o con ViewChild. La solución
    óptima es con ViewChild, porque si accedemos por vanilla js y luego tenemos dos
    veces el mismo componente en una página no funcionará correctamente*/
   //const elemHTML = document.getElementsByName('progreso')[0];
    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    // cuando se usa ViewChild se accede realmente al elemento
    // del DOM con la propiedad nativeElement. Si no queremos usar ViewChild
    // se puede hacer con js vanilla de esta manera:
    // let input = (<HTMLInputElement>document.getElementById('miInput')).value;
    // input = (this.progreso).toString();
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso); // emite el cambio
  }
}
