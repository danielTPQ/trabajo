import {AuthGuardService} from './shared/guards/auth-guard.service';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './shared/pages/home/home.component';

const APP_ROUTES: Routes = [

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},

  {
    path: 'administration',
    loadChildren: () => import('./portal/moduleadministration/administration.module').then(m => m.AdministrationModule),
    canActivate: [AuthGuardService]
  },

];

export const routing = RouterModule.forRoot(APP_ROUTES, {useHash: true});
