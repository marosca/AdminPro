import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  stream1$: Subscription;
  stream2$: Subscription;
  stream3$: Subscription;

  constructor() {
    /* Observable uno, probando errores y rety() */
    this.stream1$ = this.dameObservable()
      .pipe(retry(2))
      .subscribe(
        (numero) => console.log('1º Subscripcion: ', numero),
        (error) => console.log('Saltó error', error),
        () => console.log('El observable terminó')
      );
    /* Observable dos, probando map*/
    this.stream2$ = this.dameOtroObservable()
      .subscribe(
        (numero) => console.log('2º Subscripcion: ', numero),
        (error) => console.log('Saltó error', error),
        () => console.log('El observable terminó')
      );
    /* Observer infinito */
    this.stream3$ = this.dameObserverInfinito()
      .subscribe(
        (numero) => console.log('3º Subscripcion: ', numero),
        (error) => console.log('Saltó error', error),
        () => console.log('El observable terminó')
      );
   }



  ngOnInit() {
  }

  dameObservable(): Observable<number> {
    return new Observable( observer => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador++;
        observer.next(contador);
        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }
        /*Cuando es 2, salta el error en la subscrición. Sin embargo
        si se usa el pipe con un retry, se salta el error y vuelve
        a intentar el código, como el contador no se ha inicializado
        cuando reintenta la subscrición, el contado pasa de 2 (donde saltó
        el error) a 3 y ya entra a la condición, se borra el intervalo y
        se completa la subscripción*/
        if (contador === 2) {
          observer.error('Auxilio');
        }
      }, 1000);
    });
  }

  dameOtroObservable(): Observable<any> {
    let observable = new Observable( observer => {
      let contador = 0;
      let int = setInterval(() => {
        contador++;
        let respuesta = { valor: contador };
        observer.next(respuesta);
        if (contador === 10) {
          clearInterval(int);
          observer.complete();
        }
      }, 1000);
    });

    return observable
      .map( (response: any) => response.valor)
      .filter( (el) => !(el % 2));
  }

  dameObserverInfinito(): Observable<number> {
    return new Observable( observer => {
      let contador = 0;
      let int = setInterval(() => {
        contador++;
        observer.next(contador);
      }, 1000);
    });
  }

  ngOnDestroy() {
    this.stream3$.unsubscribe();
  }
}
