import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  titulo: string;
  constructor(private router: Router,
              private title: Title,
              private meta: Meta,
              private activatedRoute: ActivatedRoute) {
    this.getDataRoute()
      .subscribe( data => {
        this.titulo = data.titulo;
        this.title.setTitle(this.titulo);

        const metaTag: MetaDefinition = {
          name: 'description',
          content: this.titulo
        };
        this.meta.updateTag(metaTag);
      });
  }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events
      .filter( ev => ev instanceof ActivationEnd)
      .filter( (ev: ActivationEnd) => !ev.snapshot.firstChild)
      .map( (ev: ActivationEnd) => ev.snapshot.data);
  }

  goToLogin() {
    this.router.navigate(['login'])
      .then(data => console.log('navegando', data));
    console.log(this.router);
  }

}
