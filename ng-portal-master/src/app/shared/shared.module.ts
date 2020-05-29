import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {HeaderComponent} from './pages/header/header.component';
import {FooterComponent} from './pages/footer/footer.component';
import {HomeComponent} from './pages/home/home.component';
import { CardsComponent } from './pages/home/cards/cards.component';
import { GraphsComponent } from './pages/home/graphs/graphs.component';

@NgModule({

  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CardsComponent,
    GraphsComponent,
  ],

  imports: [
    CommonModule,
    MaterialModule
  ],

  exports: [
    HeaderComponent,
    FooterComponent,
  ]

})

export class SharedModule {
}
