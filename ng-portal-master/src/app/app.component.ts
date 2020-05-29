import {Component} from '@angular/core';

import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef} from '@angular/core';

interface Menu {
  id: number,
  title: string,
  icon: string,
  route: string,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  mobileQuery: MediaQueryList;
  menu = this.getMenu();

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  }

  getMenu(): Menu[] {
    this.menu = [
      {id: 1, title: 'Inicio', icon: 'group', route: 'home'},
      {id: 2, title: 'Personas', icon: 'group', route: '/administration/persons'},
    ];
    return this.menu;
  }

}
