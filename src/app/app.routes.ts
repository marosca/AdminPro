import {Routes, RouterModule} from '@angular/router';

import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NoRecargarGuard } from './services/service.index';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [NoRecargarGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [NoRecargarGuard]},
  {path: '**', component: NopagefoundComponent},
]

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});
