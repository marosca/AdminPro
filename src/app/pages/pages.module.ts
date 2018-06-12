import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Formularios
import { FormsModule } from '@angular/forms';

// ng2-charts
import { ChartsModule } from 'ng2-charts';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    Graficas1Component,
    ProgressComponent,
    IncrementadorComponent,
    GraficoDonaComponent,
    AccountSettingsComponent,
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    Graficas1Component,
  ],
  imports: [
    CommonModule, // como esto es un modulo personalizado, esto es necesario para utilizar directivas tipos ngfor ngif...
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule,
  ]
})

export class PagesModule { }
