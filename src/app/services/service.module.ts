import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SharedService,
  SidebarService,
  SettingsService
} from './service.index';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    SharedService,
    SidebarService,
    SettingsService
  ]
})

export class ServiceModule { }
