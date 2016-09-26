/// <reference path="../typings/index.d.ts"/>

import {Component, ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HelloComponent} from './app/hello';

@Component({
  selector: 'rootApp',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

}

const routes: Routes = [
  {
    path: '',
    component: HelloComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
