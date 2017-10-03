/* eslint-disable */

// ===# module imports #=== //
import app from './js/app';
// ===# controller imports #=== //
import session from './js/controllers/app.session';
import homeController from './js/controllers/app.home';
import userController from './js/controllers/app.user';
import newsController from './js/controllers/app.news';
import eventTypeController from './js/controllers/app.eventType';
import eventController from './js/controllers/app.event';
import placeController from './js/controllers/app.place';
// ===# interceptor imports #=== //
import loadingInterceptor from './js/interceptors/app.loading';
// ===# provider imports #=== //
import routeProvider from './js/providers/ngRoute.routeProvider';
import httpProvider from './js/providers/app.httpProvider';
// ===# resource imports #=== //
import dataResource from './js/services/app.dataResource';
// ===# service imports #=== //
import alertService from './js/services/uiAlert.alert';
import sessionService from './js/services/app.session';
// ===# directive imports #=== //
import ngModel from './js/directives/ng-model/app.ng-model';
