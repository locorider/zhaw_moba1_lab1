/// <reference path="../typings/index.d.ts"/>

import {Component, ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HelloComponent} from './app/hello';
import {TagiComponent} from "./app/tagi/TagiComponent";

@Component({
  selector: 'rootApp',
  template: require('./root.html')
})
export class AppComponent {

}

const routes: Routes = [
  {
    path: '',
    component: HelloComponent
  },
  {
    path: 'tagi',
    component: TagiComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
