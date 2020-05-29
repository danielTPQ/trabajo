import {Routes} from '@angular/router';
import {PersonsComponent} from './persons/persons.component';

export const ADMINISTRATION_ROUTES: Routes = [
  {
    path: '',
    canActivate: [],
    children: [
      {path: 'persons', component: PersonsComponent},
    ]
  },
];
