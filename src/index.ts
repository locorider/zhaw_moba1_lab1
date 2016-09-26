/// <reference path="../typings/index.d.ts"/>

import 'es6-shim';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import './index.less';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from "./app.module";


const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
